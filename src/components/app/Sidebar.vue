<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{
        link.title | localize
      }}</a>
    </router-link>
  </ul>
</template>


<script>
// В Vue 3 router-link не поддерживает свойство tag, поэтому код Владилена не работает.
//   <ul class="sidenav app-sidenav open">
//     <router-link  :tag="li"
//     v-for ='link in links' :key='link.url'
//     active-class="active" :to="link.url">
//       <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
//     </router-link>
//   </ul>
// я по подсказке комментторов переделал в li>router-view
// <ul class="sidenav app-sidenav" :class="{ open: modelValue }">
//   <!-- добавляем класс open для отображения Sidebar -->
//   <li v-for="link in links" :key="link.url" active-class="active">
//     <router-link :to="link.url" class="waves-effect waves-orange pointer">
//       {{ link.title }}
//     </router-link>
//   </li>
// </ul>

export default {
  // если принимаем v-model isOpen, то она содержится в props: со значением
  // "value" (vue2)
  // "modelValue" (vue3)
  //props: ["modelValue"],
  props: ["value"],
  // ()=>({ самовып. функция?

  data: () => ({
    links: [
      { title: "Menu_Bill", url: "/", exact: true },
      { title: "Menu_History", url: "/history" },
      { title: "Menu_Planning", url: "/planning" },
      { title: "Menu_NewRecord", url: "/record" },
      { title: "Menu_Categories", url: "/categories" },
    ],
  }),
};
// by Vladilen
// import localizeFilter from '@/filters/localize.filter'
// export default {
//   props: ['value'],
//   data: () => ({
//     links: [
//       { title: localizeFilter('Menu_Bill'), url: '/', exact: true },
//       { title: localizeFilter('Menu_History'), url: '/history' },
//       { title: localizeFilter('Menu_Planning'), url: '/planning' },
//       { title: localizeFilter('Menu_NewRecord'), url: '/record' },
//       { title: localizeFilter('Menu_Categories'), url: '/categories' }
//     ]
//   })
// }
//  в main-layout для немедленного обновления привяжем  :key=
// <Sidebar v-model="isOpen" :key="locale"/>
//   computed: {
// ...
//   locale() {
//     return this.$store.getters.info.locale
//   }
// },
</script>




