const BASE_URL = process.env.REACT_APP_BACKEND_URL;
//allnews
export const newsSlice = {
  async getMainNews() {
    const response = await fetch(`${BASE_URL}/news?_sort=createdAt:DESC&_limit=3`);
    return await response.json();
  },

  async getSideNews() {
    const response = await fetch(`${BASE_URL}/news?_sort=createdAt:DESC&_start=3&_limit=10`);
    return await response.json();
  },

  async getServiceNews() {
    const response = await fetch(`${BASE_URL}/news/category/tin-dich-vu`);
    return await response.json();
  },

  async getMedicalNews() {
    const response = await fetch(`${BASE_URL}/news/category/tin-y-te`);
    return await response.json();
  },

  async getCommonMedicalNews() {
    const response = await fetch(`${BASE_URL}/news/category/thuong-thuc-y-te`);
    return await response.json();
  },

  async getAllNews() {
    try {
      const [mainNews, sideNews, serviceNews, medicalNews, commonMedicalNews] = await Promise.all([
        this.getMainNews(),
        this.getSideNews(),
        this.getServiceNews(), 
        this.getMedicalNews(),
        this.getCommonMedicalNews()
      ]);

      return {
        mainNews,
        sideNews,
        serviceNews,
        medicalNews,
        commonMedicalNews
      };
    } catch (error) {
      console.error('Error fetching all news:', error);
      throw error;
    }
  }
};
//service
export const newsService = {
  async getMainNews() {
    const response = await fetch(`${BASE_URL}/news/category/tin-dich-vu?_sort=createdAt:DESC&_limit=3`);
    return await response.json();
  },

  async getSideNews() {
    const response = await fetch(`${BASE_URL}/news/category/tin-dich-vu?_sort=createdAt:DESC&_start=3&_limit=10`);
    return await response.json();
  },

  async getServiceNews() {
    const response = await fetch(`${BASE_URL}/news/category/tin-dich-vu`);
    return await response.json();
  },

  async getAllNews() {
    try {
      const [mainNews, sideNews, serviceNews] = await Promise.all([
        this.getMainNews(),
        this.getSideNews(),
        this.getServiceNews(), 
      ]);

      return {
        mainNews,
        sideNews,
        serviceNews,
      };
    } catch (error) {
      console.error('Error fetching all news:', error);
      throw error;
    }
  }
};
//medical
export const newsMedical = {
    async getMainNews() {
      const response = await fetch(`${BASE_URL}/news/category/tin-y-te?_sort=createdAt:DESC&_limit=3`);
      return await response.json();
    },
  
    async getSideNews() {
      const response = await fetch(`${BASE_URL}/news/category/tin-y-te?_sort=createdAt:DESC&_start=3&_limit=10`);
      return await response.json();
    },
  
    async getServiceNews() {
      const response = await fetch(`${BASE_URL}/news/category/tin-y-te`);
      return await response.json();
    },
  
    async getAllNews() {
      try {
        const [mainNews, sideNews, serviceNews] = await Promise.all([
          this.getMainNews(),
          this.getSideNews(),
          this.getServiceNews(), 
        ]);
  
        return {
          mainNews,
          sideNews,
          serviceNews,
        };
      } catch (error) {
        console.error('Error fetching all news:', error);
        throw error;
      }
    }
  };
//knowlage
export const newsKnowlage = {
    async getMainNews() {
      const response = await fetch(`${BASE_URL}/news/category/thuong-thuc-y-te?_sort=createdAt:DESC&_limit=3`);
      return await response.json();
    },
  
    async getSideNews() {
      const response = await fetch(`${BASE_URL}/news/category/thuong-thuc-y-te?_sort=createdAt:DESC&_start=3&_limit=10`);
      return await response.json();
    },
  
    async getServiceNews() {
      const response = await fetch(`${BASE_URL}/news/category/thuong-thuc-y-te`);
      return await response.json();
    },
  
    async getAllNews() {
      try {
        const [mainNews, sideNews, serviceNews] = await Promise.all([
          this.getMainNews(),
          this.getSideNews(),
          this.getServiceNews(), 
        ]);
  
        return {
          mainNews,
          sideNews,
          serviceNews,
        };
      } catch (error) {
        console.error('Error fetching all news:', error);
        throw error;
      }
    }
  };