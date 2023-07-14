<template>
  <div class="header-crumb">
    <n-breadcrumb>
      <template v-for="item in breadcrumb" :key="item.name">
        <n-breadcrumb-item @click="handleClickToPath(item.path)">
          {{ item.name }}
        </n-breadcrumb-item>
      </template>
    </n-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import useLoginStore from '@/stores/login/login'
import { mapPathToBreadcrumb } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumb = computed(() => mapPathToBreadcrumb(route.path, userMenus))
function handleClickToPath(path: string) {
  router.push(path)
}
</script>

<style scoped lang="less"></style>
