<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-9">
        <h2 class="row justify-content-center mt-5">
          <router-link to="/index"
            >Welcome! To a Bunch of Different Things</router-link
          >
        </h2>
        <div class="row justify-content-center">
          <router-link to="/create" class="m-3 btn btn-primary"
            >Create post</router-link
          >
          <router-link to="/financials" class="m-3 btn btn-secondary"
            >Search company financial data</router-link
          >
          <router-link to="/markdown" class="m-3 btn btn-dark"
            >Markdown Previewer</router-link
          >
          <router-link to="/chess" class="m-3 btn btn-info"
            >Play Chess</router-link
          >
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>
