<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <h3>Editor</h3>
          <editor
            v-model="content"
            ref="”aceeditor”"
            @init="editorInit"
            lang="”markdown”"
            theme="dracula"
            :height="height"
          ></editor>
        </div>
        <div class="col-md-6">
          <h3>Previewer</h3>
          <div v-decode :key="content" class="card text-left p-2" :style="styleObject">{{content}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Markdown",
  components: {
    editor: require("vue2-ace-editor"),
  },
  props: {
    msg: String,
  },
  data() {
    return {
      styleObject: {
        height: window.innerHeight - 100 + "px",
        color: "black",
        overflowY: "auto",
      },
      content: "",
      height: window.innerHeight - 100,
    };
  },
  methods: {
    editorInit() {
      require("brace/ext/language_tools");
      require("brace/mode/markdown");
      require("brace/theme/dracula");
    },
  },
};
</script>
