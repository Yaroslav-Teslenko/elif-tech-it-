import _ from "lodash";

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
    setupPagination(allItems) {
      //получили массив массивов по this.pageSize- элементов
      this.allItems = _.chunk(allItems, this.pageSize);
      //получили количество подмассивов
      this.pageCount = _.size(this.allItems);
      //отображаем страницу пагинации, дате()...page, по дефолту - первую страницу
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
  },
};
