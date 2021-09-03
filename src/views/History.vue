<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет.
      <router-link to="/record">Добавьте первую</router-link>
    </p>

    <section v-else>
      <!-- <HistoryTable :records="recordsReverse" />
      теперь берем  из миксина
      -->
      <HistoryTable :records="items" :idx_add="(page - 1) * pageSize" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
/*
https://www.npmjs.com/package/vuejs-paginate
<paginate
  :page-count="20"
  :click-handler="functionName"
  :prev-text="'Prev'"
  :next-text="'Next'"
  :container-class="'className'"
  :page-class="'page-item'">
</paginate>

https://materializecss.com/pagination.html
  <ul class="pagination">
    <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
    <li class="active"><a href="#!">1</a></li>
    <li class="waves-effect"><a href="#!">2</a></li>
    <li class="waves-effect"><a href="#!">3</a></li>
    <li class="waves-effect"><a href="#!">4</a></li>
    <li class="waves-effect"><a href="#!">5</a></li>
    <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
  </ul>

  ====
  комбинируем
:container-class="'className'"  в   :container-class="'pagination'"

:page-class="'page-item'" в
:page-class="'waves-effect'"

*/
import HistoryTable from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin'
import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History'),
    }
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    // TODO!в конспест через доп.переменную, чтобы не перерисовывать 2 раза страницу
    this.records = await this.$store.dispatch('fetchRecords')
    const categoires = await this.$store.dispatch('fetchCategories')
    this.setup(categoires)
    this.loading = false
  },
  methods: {
    setup(categoires) {
      //this.records = records.map((record) => {
      this.setupPagination(
        this.records
          .map((record) => {
            return {
              ...record,
              categoryName: categoires.find((c) => c.id === record.categoryId)
                .title,
              typeClass: record.type === 'income' ? 'green' : 'red',
              typeText: record.type === 'income' ? 'Доход' : 'Расход',
            }
          })
          .reverse()
      )
      /*
        vue-chartjs - это обёртка для Chart.js на Vue.
        Поэтому примеры стоит искать в chart.js
        https://www.chartjs.org/docs/latest/
        https://www.chartjs.org/docs/latest/charts/bar.html

        ***
        Cannot read property 'getContext' of undefined
        Chart.js посторн на canvas. Vladilen решил так - в шаблоне должен быть
        <canvas ref="canvas"></canvas>

      */
      this.renderChart({
        // прошлись по категориям, вывели в заголвок
        labels: categoires.map((c) => c.title),
        // вывели траты по категории
        datasets: [
          {
            label: 'Расходы по категориям',
            data: categoires.map((c) => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  // суммируем по каждой категории
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            // TODO цвета по всем категориям
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      })
    },
  },
  components: {
    HistoryTable,
  },
}
</script>

  // computed: {
  //   recordsReverse() {
  //     return this.records.slice().reverse();
  //   },
  // },