import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

import Button from '~/components/Button';
import Modal from '~/components/modal';
import { fetchUpdateRecord } from '~/redux/record/recordSlice';
import { generateYears, generateDays, generateMonths } from '~/utils/time';
import { fetchAllProvinces, fetchDistrictsByProvince, fetchWardsByDistricts } from '~/redux/location/locationSlice';

import styles from '../record.module.scss';
const cx = classNames.bind(styles);

function EditRecord({ editRecord, setShowModalEdit, fetchRecords }) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const dispatch = useDispatch();

  const [provinceOptions, setProvinceOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const recordId = editRecord?._id;

  const [selectedProvince, setSelectedProvince] = useState(editRecord?.address[0]?.provinceId || null);
  const [selectedDistrict, setSelectedDistrict] = useState(editRecord?.address[0]?.districtId || null);

  // Khi chọn tỉnh/thành phố
  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption.value);
    setSelectedDistrict(null); // Reset quận/huyện khi đổi tỉnh
    setWardOptions([]);
  };

  // Khi chọn quận/ huyện
  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption.value);
    setWardOptions([]);
  };

  const handleEditRecord = async (record) => {
    try {
      const birthdate = new Date(
        `${record?.year?.value}-${record?.month?.value.padStart(2, '0')}-${record?.day?.value.padStart(
          2,
          '0',
        )}T00:00:00.000Z`,
      );

      const formData = {
        fullName: record?.fullName,
        phoneNumber: record?.phoneNumber,
        email: record?.email,
        job: record?.job,
        cccd: record?.cccd,
        gender: record?.gender,
        ethnic: record?.ethnic,
        street: record?.street,
        birthdate,
        provinceId: record?.province?.value,
        provinceName: record?.province?.label,
        districtId: record?.district?.value,
        districtName: record?.district?.label,
        wardId: record?.ward?.value,
        wardName: record?.ward?.label,
      };

      const res = await dispatch(fetchUpdateRecord({ recordId, formData }));
      const result = unwrapResult(res);

      if (result.status) {
        setShowModalEdit(false);
        toast.success(result.message);
        fetchRecords();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error?.message || 'Có lỗi xảy ra khi cập nhật');
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await dispatch(fetchAllProvinces());
      const result = unwrapResult(res);
      const provinceOptions = result.data.map((provinces) => ({
        value: provinces.id,
        label: provinces.name,
      }));
      setProvinceOptions(provinceOptions);
    };
    fetchProvinces();
  }, [dispatch]);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        const res = await dispatch(fetchDistrictsByProvince(selectedProvince || selectedProvince?.value));
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
      const fetchWards = async () => {
        const res = await dispatch(fetchWardsByDistricts(selectedDistrict || selectedDistrict?.value));
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

  useEffect(() => {
    if (editRecord) {
      reset({
        hospitalType: editRecord?.hospitalType || '',
        gender: editRecord?.gender || '',
        ethnic: editRecord.ethnic || '',
        year: {
          value: new Date(editRecord?.birthdate).getFullYear().toString() || '',
          lable: new Date(editRecord?.birthdate).getFullYear().toString() || '',
        },
        month: {
          value: (new Date(editRecord?.birthdate).getMonth() + 1).toString() || '',
          lable: (new Date(editRecord?.birthdate).getMonth() + 1).toString() || '',
        },
        day: {
          value: new Date(editRecord?.birthdate).getDate().toString() || '',
          lable: new Date(editRecord?.birthdate).getDate().toString() || '',
        },
        province: {
          value: editRecord?.address?.[0]?.provinceId || '',
          label: editRecord?.address?.[0]?.provinceName || '',
        },
        district: {
          value: editRecord?.address?.[0]?.districtId || '',
          label: editRecord?.address?.[0]?.districtName || '',
        },
        ward: {
          value: editRecord?.address?.[0]?.wardId || '',
          label: editRecord?.address?.[0]?.wardName || '',
        },
      });
    }
  }, [editRecord, reset]);
  return (
    <Modal isOpen={true} onClose={() => setShowModalEdit(false)} title="Hồ sơ bệnh nhân">
      <div>
        <div className="max-h-[400px] overflow-auto my-8">
          <form onSubmit={handleSubmit(handleEditRecord)}>
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 px-8">
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
                      defaultValue={editRecord?.fullName}
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
                          value={
                            [
                              { value: 'male', label: 'Nam' },
                              { value: 'female', label: 'Nữ' },
                              { value: 'other', label: 'Khác' },
                            ].find((option) => option.value === field.value) ||
                            [
                              { value: 'male', label: 'Nam' },
                              { value: 'female', label: 'Nữ' },
                              { value: 'other', label: 'Khác' },
                            ].find((option) => option.value === editRecord?.gender)
                          }
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption.value);
                            setValue('hospitalType', selectedOption.value);
                          }}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 px-8">
                <div className="col-span-2">
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
                            value={
                              field.value
                                ? generateYears(1990).find((option) => option.value === field.value)
                                : generateYears(1990).find(
                                    (option) =>
                                      option.value === new Date(editRecord?.birthdate).getFullYear().toString(),
                                  )
                            }
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption);
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
                            value={
                              field.value
                                ? generateMonths().find((option) => option.value === field.value)
                                : generateMonths().find(
                                    (option) =>
                                      option.value === (new Date(editRecord?.birthdate).getMonth() + 1).toString(),
                                  )
                            }
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption);
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
                            value={
                              field.value
                                ? generateMonths().find((option) => option.value === field.value)
                                : generateMonths().find(
                                    (option) => option.value === new Date(editRecord?.birthdate).getDate().toString(),
                                  )
                            }
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption);
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 px-8">
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
                      defaultValue={editRecord?.phoneNumber}
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
                    <h2 className="font-semibold">Địa chỉ email</h2>
                    <span className="text-rose-600 font-bold">*</span>
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      defaultValue={editRecord?.email}
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 px-8">
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
                      defaultValue={editRecord?.job}
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
                      defaultValue={editRecord?.cccd}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 px-8">
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
                      defaultValue={editRecord?.email}
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
                          value={
                            [
                              { value: 'kinh', label: 'Kinh' },
                              { value: 'tày', label: 'Tày' },
                              { value: 'thái', label: 'Thái' },
                              { value: 'mường', label: 'Mường' },
                              { value: 'khmer', label: 'Khmer' },
                            ].find((option) => option.value === field.value) ||
                            [
                              { value: 'kinh', label: 'Kinh' },
                              { value: 'tày', label: 'Tày' },
                              { value: 'thái', label: 'Thái' },
                              { value: 'mường', label: 'Mường' },
                              { value: 'khmer', label: 'Khmer' },
                            ].find((option) => option.value === editRecord?.ethnic)
                          }
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption.value);
                            setValue('hospitalType', selectedOption.value);
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 px-8">
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
                          value={
                            (provinceOptions?.length > 0 &&
                              provinceOptions.find((option) => option.value === field.value)) ||
                            (provinceOptions?.length > 0 &&
                              provinceOptions.find((option) => option.value === editRecord?.address[0]?.provinceId))
                          }
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption);
                            handleProvinceChange(selectedOption);
                          }}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: state.isFocused ? '#999' : '#999',
                              height: '48px',
                              boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' : '',
                            }),
                          }}
                          placeholder="Chọn tỉnh / thành...."
                          //   onChange={(selectedOption) => {
                          //     field.onChange(selectedOption);
                          //     handleProvinceChange(selectedOption);
                          //   }}
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
                          value={
                            (districtOptions?.length > 0 &&
                              districtOptions.find((option) => option.value === field.value)) ||
                            (districtOptions?.length > 0 &&
                              districtOptions.find((option) => option.value === editRecord?.address[0]?.districtId))
                          }
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption);
                            handleDistrictChange(selectedOption);
                          }}
                          //   onChange={(selectedOption) => {
                          //     field.onChange(selectedOption);
                          //     handleDistrictChange(selectedOption);
                          //   }}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-4 px-8">
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
                          value={
                            (wardOptions?.length > 0 && wardOptions.find((option) => option.value === field.value)) ||
                            (wardOptions?.length > 0 &&
                              wardOptions.find((option) => option.value === editRecord?.address[0]?.wardId))
                          }
                          onChange={(selectedOption) => field.onChange(selectedOption)}
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
                      defaultValue={editRecord?.address[0]?.street}
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
          </form>
        </div>
        <div className="flex justify-end border-t py-2 pr-6 gap-4 pt-2">
          <Button className="text-[#2c3e50]" onClick={() => setShowModalEdit(false)}>
            Đóng
          </Button>
          <Button
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-2xl px-7 py-4 mt-2 text-center me-2 mb-2"
            onClick={() => {
              handleSubmit(handleEditRecord)();
            }}
          >
            Sửa hồ sơ
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditRecord;
