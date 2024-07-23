<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 60vh"
  />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

watch(
  () => props.language,
  () => {
    /**
     * 修改代码,根据语言
     */
    let code = "";
    if (props.language === "java") {
      code =
        "public class Main{\n" +
        "    public static void main(String[] args){\n" +
        "\n" +
        "    }\n" +
        "}";
    } else if (props.language === "cpp") {
      code =
        "#include <iostream>\n" +
        "using namespace std;\n" +
        "int main(int argc, char *argv[]) {\n" +
        '\tstd::cout << "" << std::endl;\n' +
        "\treturn 0;\n" +
        "}";
    } else if (props.language === "c") {
      code =
        "#include<stdio.h>\n" +
        "\n" +
        "int main(int argc, char *argv[]){\n" +
        '\tprintf("");\n' +
        "\treturn 0;\n" +
        "}";
    } else if (props.language === "python") {
      code = "print('')";
    }
    toRaw(codeEditor.value).setValue(code);

    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
