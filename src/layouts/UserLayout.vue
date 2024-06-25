<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/努力开发中.png" class="logo" />
          <div>OJ 判题</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <!--        <router-view />-->
        <div id="userLoginView">
          <h2 style="margin-bottom: 16px">用户登录</h2>
          <a-form
            style="max-width: 480px; margin: 0 auto"
            label-align="left"
            auto-label-width
            :model="form"
            @submit="handleSubmit"
          >
            <a-form-item field="userAccount" label="账号">
              <a-input v-model="form.userAccount" placeholder="请输入账号" />
            </a-form-item>
            <a-form-item
              field="userPassword"
              tooltip="密码不少于 8 位"
              label="密码"
            >
              <a-input-password
                v-model="form.userPassword"
                placeholder="请输入密码"
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" style="width: 120px">
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-layout-content>
      <a-layout-footer class="footer"></a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登陆失败，" + res.message);
  }
};
</script>

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
  margin-top: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script></script>
