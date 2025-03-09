import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

//icon
import { MdKeyboardArrowRight } from 'react-icons/md';

import { generateYears, generateMonths, generateDays } from '~/utils/time';
import { fetchAllProvinces, fetchDistrictsByProvince, fetchWardsByDistricts } from '~/redux/location/locationSlice';
import Button from '~/components/Button';
import { fetchCreateRecord } from '~/redux/record/recordSlice';
import { updateBooking } from '~/redux/booking/bookingSlice';

import styles from './newRecord.module.scss';
const cx = classNames.bind(styles);

function NewRecord() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [provinceOptions, setProvinceOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const userId = useSelector((state) => state?.auth?.user?.payload?.userData?._id);

  // Khi chọn tỉnh/thành phố
  const handleProvinceChange = (selectedOption) => {
    console.log('check selectedOption', selectedOption);
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null); // Reset quận/huyện khi đổi tỉnh
  };

  // Khi chọn quận/ huyện
  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };

  const submitForm = async (data) => {
    try {
      console.log('check da6aa', data.year?.value);
      console.log('check da6aa', data.month?.value);
      console.log('check da6aa', data.day?.value);
      const birthdate = new Date(
        `${data?.year?.value}-${data?.month?.value.padStart(2, '0')}-${data?.day?.value.padStart(
          2,
          '0',
        )}T00:00:00.000Z`,
      );
      console.log(1, birthdate);
      const formData = {
        userId,
        fullName: data?.fullName,
        phoneNumber: data?.phoneNumber,
        email: data?.email,
        job: data?.job,
        cccd: data?.cccd,
        gender: data?.gender?.value,
        ethnic: data?.ethnic?.value,
        street: data?.street,
        birthdate,
        provinceId: data?.province?.value,
        provinceName: data?.province?.label,
        districtId: data?.district?.value,
        districtName: data?.district?.label,
        wardId: data?.ward?.value,
        wardName: data?.ward?.label,
      };
      console.log('check form data', formData);
      const res = await dispatch(fetchCreateRecord(formData));
      const result = unwrapResult(res);
      console.log('check result record', result);
      if (result.status) {
        toast.success(result.message);
        dispatch(updateBooking({ key: 'patientProfile', value: formData }));
        navigate('/chon-lich-kham?feature=booking.doctor&stepName=confirm');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      // toast.error(error);
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await dispatch(fetchAllProvinces());
      const result = unwrapResult(res);
      const provincesData = result.data.map((provinces) => ({
        value: provinces.id,
        label: provinces.name,
      }));
      setProvinceOptions(provincesData);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        const res = await dispatch(fetchDistrictsByProvince(selectedProvince.value));
        const result = unwrapResult(res);
        const districtData = result.data.map((district) => ({
          value: district.id,
          label: district.name,
        }));
        setDistrictOptions(districtData);
      };
      fetchDistricts();
    }
  }, [selectedProvince, dispatch]);

  useEffect(() => {
    if (selectedDistrict) {
      console.log('check quận huyện', selectedDistrict);
      const fetchWards = async () => {
        const res = await dispatch(fetchWardsByDistricts(selectedDistrict.value));
        const result = unwrapResult(res);
        const wardData = result.data.map((ward) => ({
          value: ward.id,
          label: ward.name,
        }));
        setWardOptions(wardData);
      };
      fetchWards();
    }
  }, [selectedDistrict, dispatch]);

  return (
    <div>
      <div className="">
        <div className="border-b border-neutral-300 pb-10">
          <div className="max-w-screen-lg m-auto py-4">
            <ul className="flex">
              <li className="flex items-center">
                <a href="#/" className="font-semibold">
                  Trang chủ
                </a>
                <MdKeyboardArrowRight />
              </li>

              <li className="flex items-center">
                <a href="#/" className="text-sky-500 font-semibold">
                  Tạo hồ sơ bệnh nhân
                </a>
              </li>
            </ul>
          </div>
          <h1 className="text-center text-5xl text-sky-500 font-bold uppercase">Tạo mới hồ sơ</h1>
        </div>
        <div className="">
          <div className="max-w-7xl m-auto py-4">
            <h1 className="text-center text-4xl font-bold py-6">Nhập thông tin bệnh nhân</h1>
            <div className="bg-sky-200 rounded-lg border border-neutral-300 text-sky-500 p-4">
              Vui lòng cấp thông tin chính xác để được phục vụ tốt nhất. Trong trường hợp cung cấp sai thông tin bệnh
              nhân & số điện thoại, việc xác nhận cuộc hẹn sẽ không có hiệu lực trước khi đặt khám.
            </div>
            <p className="text-rose-600 text-3xl font-bold py-10">(*) Thông tin bắt buộc nhập</p>
            <div className="">
              <form onSubmit={handleSubmit(submitForm)}>
                <div>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Họ và tên (Có dấu)</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          className={cx('customInput')}
                          placeholder="Họ và tên ..."
                          {...register('fullName', { required: 'Vui lòng nhập họ và tên!' })}
                        />

                        {errors.fullName && (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{errors.fullName.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Ngày sinh(năm/tháng/ngày) (Có dấu)</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>
                      <div className="grid grid-cols-3 gap-10 mt-2">
                        <div className="col-span-1">
                          <Controller
                            name="year"
                            as={Select}
                            control={control}
                            rules={{ required: 'required' }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: state.isFocused ? '#999' : '#999',
                                    height: '48px',
                                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : '',
                                  }),
                                }}
                                placeholder="Năm ..."
                                options={[{ value: '', label: 'Năm sinh', isDisabled: true }, ...generateYears(1990)]}
                              />
                            )}
                          />

                          {errors.year && errors.year.type === 'required' ? (
                            <div>
                              <span className="text-danger text-red-500 text-xl">{'Năm sinh'}</span>
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-1">
                          <Controller
                            name="month"
                            as={Select}
                            control={control}
                            rules={{ required: 'required' }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: state.isFocused ? '#999' : '#999',
                                    height: '48px',
                                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : '',
                                  }),
                                }}
                                placeholder="Tháng..."
                                options={[{ value: '', label: 'Tháng sinh', isDisabled: true }, ...generateMonths()]}
                              />
                            )}
                          />

                          {errors.month && errors.month.type === 'required' ? (
                            <div>
                              <span className="text-danger text-red-500 text-xl">{'Tháng sinh'}</span>
                            </div>
                          ) : null}
                        </div>
                        <div className="col-span-1">
                          <Controller
                            name="day"
                            as={Select}
                            control={control}
                            rules={{ required: 'required' }}
                            placeholder="Ngày sinh"
                            render={({ field }) => (
                              <Select
                                {...field}
                                styles={{
                                  control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: state.isFocused ? '#999' : '#999',
                                    height: '48px',
                                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : '',
                                  }),
                                }}
                                placeholder="Ngày ..."
                                options={[{ value: '', label: 'Ngày sinh', isDisabled: true }, ...generateDays()]}
                              />
                            )}
                          />

                          {errors.day && errors.day.type === 'required' ? (
                            <div>
                              <span className="text-danger text-red-500 text-xl">{'Ngày sinh '}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-10 mt-4">
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Số điện thoại</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          className={cx('customInput')}
                          placeholder="Số điện thoại ..."
                          {...register('phoneNumber', { required: 'Vui lòng nhập số điện thoại' })}
                        />

                        {errors.phoneNumber && (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{errors.phoneNumber.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Giới tính</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>

                      <div className="mt-2">
                        <Controller
                          name="gender"
                          as={Select}
                          control={control}
                          rules={{ required: 'required' }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  borderColor: state.isFocused ? '#999' : '#999',
                                  height: '48px',
                                  boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : '',
                                }),
                              }}
                              options={[
                                { value: 'male', label: 'Nam' },
                                { value: 'female', label: 'Nữ' },
                                { value: 'other', label: 'Khác' },
                              ]}
                              placeholder="Giới tính ..."
                            />
                          )}
                        />

                        {errors.gender && errors.gender.type === 'required' ? (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{'Chọn giới tính'}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10 mt-4">
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Nghề nghiệp</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="job"
                          id="job"
                          className={cx('customInput')}
                          placeholder="Nghề nghiệp ..."
                          {...register('job', { required: 'Vui lòng nhập nghề nghiệp!' })}
                        />

                        {errors.job && (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{errors.job.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Mã định danh/CCCD</h2>
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="cccd"
                          id="cccd"
                          className={cx('customInput')}
                          placeholder="Cccd ..."
                          {...register('cccd', { required: 'Vui lòng nhập cccd' })}
                        />

                        {errors.cccd && (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{errors.cccd.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10 mt-4">
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Địa chỉ email</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className={cx('customInput')}
                          placeholder="Email ..."
                          {...register('email', { required: 'Vui lòng nhập email' })}
                        />

                        {errors.email && (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{errors.email.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Dân tộc</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>
                      <div className="mt-2">
                        <Controller
                          name="ethnic"
                          as={Select}
                          control={control}
                          rules={{ required: 'required' }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  borderColor: state.isFocused ? '#999' : '#999',
                                  height: '48px',
                                  boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : '',
                                }),
                              }}
                              options={[
                                { value: 'kinh', label: 'Kinh' },
                                { value: 'tày', label: 'Tày' },
                                { value: 'thái', label: 'Thái' },
                                { value: 'mường', label: 'Mường' },
                                { value: 'khmer', label: 'Khmer' },
                              ]}
                              placeholder="Dân tộc ..."
                            />
                          )}
                        />

                        {errors.ethnic && errors.ethnic.type === 'required' ? (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{'Chọn dân tộc'}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10 mt-4">
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Tỉnh / Thành</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>
                      <div className="mt-2">
                        <Controller
                          name="province"
                          as={Select}
                          control={control}
                          rules={{ required: 'required' }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  borderColor: state.isFocused ? '#999' : '#999',
                                  height: '48px',
                                  boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : '',
                                }),
                              }}
                              placeholder="Chọn tỉnh / thành...."
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption);
                                handleProvinceChange(selectedOption);
                              }}
                              options={[{ value: '', label: 'Tỉnh / thành', isDisabled: true }, ...provinceOptions]}
                            />
                          )}
                        />

                        {errors.province && errors.province.type === 'required' ? (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{'Chọn tỉnh / thành'}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Quận / Huyện</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>

                      <div className="mt-2">
                        <Controller
                          name="district"
                          as={Select}
                          control={control}
                          rules={{ required: 'required' }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  borderColor: state.isFocused ? '#999' : '#999',
                                  height: '48px',
                                  boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : '',
                                }),
                              }}
                              onChange={(selectedOption) => {
                                field.onChange(selectedOption);
                                handleDistrictChange(selectedOption);
                              }}
                              placeholder="Chọn quận / huyện ...."
                              options={[{ value: '', label: 'Quận / huyện', isDisabled: true }, ...districtOptions]}
                            />
                          )}
                        />

                        {errors.district && errors.district.type === 'required' ? (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{'Chọn quận / huyện'}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10 mt-4">
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Phường/ Xã</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>

                      <div className="mt-2">
                        <Controller
                          name="ward"
                          as={Select}
                          control={control}
                          rules={{ required: 'required' }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  borderColor: state.isFocused ? '#999' : '#999',
                                  height: '48px',
                                  boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : '',
                                }),
                              }}
                              // onChange={handleDistrictChange}
                              placeholder="Chọn phường / xã ...."
                              options={[{ value: '', label: 'Phường / xã', isDisabled: true }, ...wardOptions]}
                            />
                          )}
                        />

                        {errors.ward && errors.ward.type === 'required' ? (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{'Chọn phường / xã'}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="flex">
                        <h2 className="font-semibold">Địa chỉ (đường, số nhà)</h2>
                        <span className="text-rose-600 font-bold">*</span>
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="street"
                          id="street"
                          className={cx('customInput')}
                          placeholder="Địa chỉ ..."
                          {...register('street', { required: 'Vui lòng nhập địa chỉ!' })}
                        />

                        {errors.address && (
                          <div>
                            <span className="text-danger text-red-500 text-xl">{errors.address.message}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-10 mt-10 mb-16">
                  <Button onClick={() => reset()} className="bg-yellow-400 text-white px-10 hover:bg-yellow-500 ">
                    Nhập lại
                  </Button>
                  <Button type="submit" className="bg-cyan-400 text-white px-16 hover:bg-cyan-500">
                    Tạo mới
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRecord;
