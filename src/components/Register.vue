<template>
  <div class="register_con">
    <!--左边-->
    <div class="reg_lf">
      <!-- logo 标语     -->
      <a href="#" class="reg_logo">
        <img src="../assets/logo.png" alt="美多商城">
      </a>
      <div class="reg_slogan">商品美 · 种类多 · 欢迎光临</div>
      <div class="reg_banner"></div>
    </div>
    <!--右边-->
    <div class="reg_rf">
      <div class="reg_title clear_fix">
        <h1>用户注册</h1>
        <a href="#">登陆</a>
      </div>
      <!--注册表单-->
      <div class="reg_form clear_fix">
        <el-form :model="registerForm" :rules="registerFormRules" ref="registerFormRef" status-icon label-width="100px" class="registerForm">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="password2">
            <el-input type="password" v-model="registerForm.password2" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机:" prop="mobile">
            <el-input v-model="registerForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="图形验证码:" prop="image_code">
            <el-col :span="11">
              <el-input v-model="registerForm.image_code"></el-input>
            </el-col>
            <el-col :span="13">
              <el-image :src="image_code_url" @click="generate_image_code" alt="图形验证码"></el-image>
            </el-col>
          </el-form-item>
          <el-form-item label="短信验证码:" prop="mobile_code">
            <el-col :span="10">
              <el-input v-model="registerForm.mobile_code"></el-input>
            </el-col>
            <el-col :span="10" class="">
              <el-button>获取短信验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="" prop="allow">
            <el-checkbox v-model="registerForm.allow" class="reg_allow">同意"美多商城用户使用协议"</el-checkbox>
          </el-form-item>
          <el-form-item label="" prop="reg">
            <el-button type="danger" @click="registerBtn" class="reg_sub">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import common from '../assets/js/common'
export default {
  name: 'Register',
  data() {
    // 自定义 确认密码 验证规则
    const regPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    // 验证用户名是否注册
    const username = async(rule, value, callback) => {
      const url = 'username/' + value + '/count/'
      const { data: res } = await this.$http.get(url);
      if (res.count === 1) {
        callback(new Error('用户名已注册'));
      } else {
        callback();
      }
    };
    // 验证手机号是否注册

    return {
      // 注册表单的数据绑定对象
      registerForm: {
        username: '',
        password: '',
        password2: '',
        mobile: '',
        image_code: '',
        mobile_code: '',
        allow: ''
      },
      // 图形验证码链接
      image_code_url: '',
      uuid: '',
      // 注册表单验证规则
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
          { validator: username, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: regPassword2, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        allow: [
          { required: 'array', message: '请勾选协议', trigger: 'change' }
        ]
      }
    }
  },
  // 页面加载完调用此方法
  mounted() {
    // 生成图形验证码
    this.generate_image_code();
  },
  methods: {
    /* 注册表单预验证 */
    registerBtn() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return null;
        const { data: result } = await this.$http.post('register', this.registerForm);
        console.log(result);
      });
    },
    /* 生成图形验证码 */
    generate_image_code() {
      this.uuid = common.generateUUID();
      this.image_code_url = 'http://127.0.0.1:8007/image_code' + '/image_code' + this.uuid + '/'
      console.log(this.image_code_url);
    }
  }
}
</script>

<style lang="less" scoped>
  .register_con {
    width: 720px;
    overflow: hidden;
    margin: 50px auto 0;
    background: url("../assets/images/interval_line.png") 300px center no-repeat;
    /* 左边样式 */
    .reg_lf {
      float: left;
      width: 300px;
      /*background-color: antiquewhite;*/
      /* logo 标语 */

      .reg_logo {
        width: 200px;
        height: 76px;
        float: right;
        margin-right: 30px;
      }

      .reg_slogan {
        width: 300px;
        height: 30px;
        float: right;
        text-align: right;
        font-size: 22px;
        color: #fe0000;
        margin: 20px 20px 0 0;
      }

      /* banner */

      .reg_banner {
        width: 251px;
        height: 329px;
        background: url(../assets/images/register_banner.png) no-repeat;
        float: right;
        margin: 20px 10px 0 0;
        opacity: 0.5;
      }
    }

    /* 右边样式 */
    .reg_rf {
      float: right;
      width: 420px;
      overflow: hidden;
      /*background-color: aquamarine;*/
      /* 注册标题 */
      .reg_title {
        width: 380px;
        height: 50px;
        float: left;
        margin-left: 30px;
        border-bottom: 1px solid #e0e0e0;

        h1 {
          height: 50px;
          line-height: 50px;
          float: left;
          font-size: 24px;
          color: #a8a8a8;
          font-weight: bold;
        }

        a {
          float: right;
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          color: #c40000;
          padding-right: 20px;
          background: url(../assets/images/icons02.png) 35px 3px no-repeat;
          margin-top: 15px;
        }
      }

      /* 注册表单 */
      .reg_form {
        width: 380px;
        margin: 30px 0 0 30px;
        float: left;
        position: relative;
        .registerForm {
          .el-image {
            width: 130px;
            height: 40px;
            margin-left: 10px;
          }
          .el-button {
            margin-left: 10px;
          }
          .reg_allow {
            text-indent: 8px;
            font-size: 8px;
            color: #a8a8a8;
          }
          /*注册按钮*/
          .reg_sub {
            width: 270px;
            height: 40px;
            font-size: 18px;
            /*background-color: #ff5757;
            color: #fff;*/
          }
        }
      }
      .clear_fix {
        zoom: 1;
      }
    }
  }
</style>
