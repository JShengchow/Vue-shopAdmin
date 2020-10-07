<template>
  <div id="app" class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avtar_box">
        <img src="../assets/logo.png" alt="头像" />
      </div>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="loginFormRulers"
        label-width="0px"
        class="login_fomr"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <!-- 用户名 -->
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <!-- 密码 -->
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <!-- 按钮 -->
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登录表单数据绑定
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //表单验证规则
      loginFormRulers: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    //重置表单
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      //Return a PromiseProject
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post("login", this.loginForm);
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("登录失败,请核对后重新输入");
        }
        this.$message.success("登录成功");
        //登录成功保存token到sesionstorage（网站打开期间有效，localStorage是长期的）
        window.sessionStorage.setItem("token", res.data.token);
        // Jump to home
        this.$router.push("home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avtar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
  .login_fomr {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
