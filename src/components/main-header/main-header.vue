<template>
  <div class="main-header">
    <n-icon size="24" class="fold" @click="handleMenuIconClick">
      <component :is="isFold ? ExpandIcon : FoldIcon" />
    </n-icon>
    <n-breadcrumb class="breadcrumb">
      <n-breadcrumb-item> 北京总行</n-breadcrumb-item>
      <n-breadcrumb-item> 天津分行</n-breadcrumb-item>
      <n-breadcrumb-item> 平山道支行</n-breadcrumb-item>
    </n-breadcrumb>
    <header-info></header-info>
  </div>
</template>

<script setup lang="ts">
import FoldIcon from '../icons/fold-icon.vue'
import ExpandIcon from '../icons/expand-icon.vue'
import HeaderInfo from './c-cpns/header-info.vue'
import { ref } from 'vue'

const props = defineProps(['collapsed'])
const emit = defineEmits(['foldChange'])

const isFold = ref(props.collapsed)
function handleMenuIconClick() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  width: 100%;
  display: flex;
  align-items: center;

  .fold {
    width: 25px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .breadcrumb {
    flex: 1;
  }
}
</style>
