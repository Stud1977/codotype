
<template>
  <button class='btn mt-2 btn-block text-left active' v-if="opt.value === val" @click="click(opt.value)">
    <i :class="'fa mr-2 ' + opt.icon" />
    {{opt.label}}
  </button>

  <button class='btn mt-2 btn-block text-left' v-else @click="click(opt.value)">
    <i :class="'fa mr-2 ' + opt.icon" />
    {{opt.label}}
  </button>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['opt', 'val', 'click']
}
</script>
