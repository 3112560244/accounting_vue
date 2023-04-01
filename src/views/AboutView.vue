<template>
    <div>
        <!-- 富文本编辑器 -->
        <quill-editor v-model="content"></quill-editor>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.snow.css'; // 引入quill-editor的CSS文件
export default {
    components: { quillEditor },
    data() {
        return {
            content: '<p>Hello World!</p>'
        }
    }
}
</script>
