<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBanners } from '@/api/honme'
import type { AwaitReturnTypeResult } from '@/utils/http'
import CustomNavbar from './components/CustomNavbar.vue'
const list = ref<AwaitReturnTypeResult<typeof getBanners>>([])
onMounted(async () => {
  const res = await getBanners()
  list.value = res.result
})
//
</script>

<template>
  <CustomNavbar />
  <XtxSwiper v-model="list" />
  <uni-section title="基础用法" type="line" padding>
    <view class="example-body">
      <uni-badge class="uni-badge-left-margin" text="1" />
      <uni-badge class="uni-badge-left-margin" text="2" type="primary" />
      <uni-badge class="uni-badge-left-margin" text="34" type="success" />
      <uni-badge class="uni-badge-left-margin" text="45" type="warning" />
    </view>
  </uni-section>
</template>

<style lang="scss">
//
</style>
