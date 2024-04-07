<template>
  <div class="card border-0 shadow position-relative">
    <img src="../../bostorek/images/b1.jpg" class="card-img-top" />
    <div class="card-body">
      <div class="auth-box">
        <span style="background-color: #063547" class="py-1 px-3 text-white rounded-pill"
          >{{ book.author }}</span
        >
      </div>
      <h5 class="card-title mt-3 fw-semibold">{{ book.name }}</h5>
      <p class="card-text">
        {{book.description}}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <a href="#" class="card-link">Read More</a>
        <p style="background-color: #063547" class="py-1 px-2 text-white badge mb-0">{{book.uploadDate}}</p>
      </div>
    </div>
    <span
      class="position-absolute top-0 start-100 translate-middle p-2 bg-primary text-light rounded-circle border border-2"
    >
      {{book.rating}}
    </span>
  </div>
</template>

<script lang="ts">
import {BookType}  from '../types/types.ts'
export default {
  name: 'BookItem',
  props:{
    book:{
      type: Object as ()=> BookType,
      default:()=>({}),

    }
  }
}
</script>

<style lang="scss" scoped></style>
