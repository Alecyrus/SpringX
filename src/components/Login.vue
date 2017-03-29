<template>
  <div class="login" >
    <section>

      <video autoplay loop   style="width:100%" >

        <source src="http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_H" type="video/mp4">

        </video>

        <el-row :gutter="5">
          <el-col :span="2" :offset="19">
            <el-button type="text" style="color:#fefefe" @click="preCreateUser" >Sign up</el-button>
          </el-col>

          <el-col :span="2">
            <el-button type="text" style="color:#fefefe" >About me</el-button>
          </el-col>
        </el-row>


        <h1>{{ logo_title }}</h1>

        <el-row type="flex" justify="space-around">
          <el-col :span="3"  >
            <el-form :model="login_form" :rules="login_rules" ref="login_form" label-width="0px">
              <el-form-item label="" prop="username">
                <el-input type="text" size="small" :icon="username_input" placeholder="Username" v-model="login_form.username"  auto-complete="ons"></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input type="password" size="small" :icon="password_input"  placeholder="Password" v-model="login_form.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"   @click="submitForm('login_form')">Login</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>


        <el-row type="flex" justify="space-around">
          <el-col :span="6" class="el_col_bottom">
            <p>
              Copyright &copy; 2017 Junkai Huang. All rights reserved.
            </p>
          </el-col>

        </el-row>


      </section>



      <section>
        <el-dialog title="" top="15%" v-model="dialogSignUpFormVisible" size="small">
          <el-row>
            <el-col :span="8">
              <h2>
                Sign Up
              </h2>
            </el-col>
          </el-row>
          <el-row :gutter="10">

            <el-col :span="14" :offset="2" >
              <el-form :model="sign_form" :rules="signup_rules" ref="sign_form"  label-width="100px" class="demo-ruleForm">
                <el-form-item label="Username" prop="newUsername" >
                  <el-input v-model="sign_form.newUsername" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="newPassword">
                  <el-input  type="password" v-model="sign_form.newPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Confirm" prop="checkPassword" >
                  <el-input type="password" v-model="sign_form.checkPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="newEmail">
                  <el-input v-model="sign_form.newEmail" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
           <el-button @click="dialogSignUpFormVisible = false">Cancel</el-button>
           <el-button type="primary" @click="createUser" :loading="isCreate" >Create</el-button>
         </div>
       </el-dialog>

     </section>



   </div>
 </template>

 <script>
  export default {
    name: 'login',
    data () {
      var validateUsername = (rule, value, callback) => {
        this.username_input = "loading";
        if (value === '') {
          callback(new Error('Please input Username'));
          this.username_input = "circle-close";
        }
        else {
          this.username_input = "circle-check";
        }
        callback();
      };
      var validatePassword = (rule, value, callback) => {
        this.password_input = "loading";
        this.sleep(1000);
        if (value === '') {
          callback(new Error('Please input password'));
          this.password_input = "circle-close";
        }
        else {
          this.password_input = "circle-check";
        }
        callback();
      };
      var validateNewPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please confirm the password'));
        } else if (value !== this.sign_form.newUsername) {
          callback(new Error('Error!'));
        } else {
          callback();
        }
      };
      return {
        login_form: {
          username: '',
          password: ''
        },
        sign_form:{
          newUsername: '',
          newPassword: '',
          newEmail: '',
          checkPassword: ''
        },
        login_rules: {
          username: [
          { validator: validateUsername, trigger: 'change' }
          ],
          password: [
          { validator: validatePassword, trigger: 'change' }
          ]
        },
        signup_rules: {
          newUsername: [
          { required: true, trigger: 'blur'},
          { min: 6, message: 'at least 6 characters', trigger: 'blur' }
          ],
          newPassword: [
          { required: true,  message: 'Please input password', trigger: 'blur'},
          { min: 8, message: 'at least 8 characters', trigger: 'blur' }
          ],
          checkPassword: [
          { validator: validateNewPassword, trigger: 'blur'},
          { required: true,  message: 'Please input password', trigger: 'blur'},
          { min: 8, message: 'at least 8 characters', trigger: 'blur' }
          ],
          newEmail: [
          { required: true, trigger: 'blur'}
          ]
        },
        dialogSignUpFormVisible: false,
        isCreate: false,
        logo_title: 'SpingX',
        username_input: '',
        password_input: ''
      };  
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            console.log(this.login_form.username);
            this.$store.dispatch({
              type: 'setUserInfo',
              username: this.login_form.username,
              password: this.login_form.password
            })
            //这里进行登录验证
            console.log(this.$store.getters.getUsername);
            //登录成功进行跳转
            this.$router.push('/user/'+this.$store.getters.getUsername+"/overview");

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      preCreateUser() {
        this.isCreate = false;
        this.dialogSignUpFormVisible = true;
        this.$refs['sign_form'].resetFields();


      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      async createUser() {
        // this.$refs[formName].resetFields();
        this.isCreate = true;
        console.log(this.sign_form.newUsername);
        console.log(this.sign_form.newPassword);
        console.log(this.sign_form.newEmail);
        this.$request.post('/api/v1/account/user', {
          username: this.sign_form.newUsername,
          password: this.sign_form.newPassword,
          email:this.sign_form.newEmail
        }).then(function (response) {
          console.log(response.data);
          console.log(this.isCreate);
        }).catch(function (error) {
          console.log(error);
          return error;
        });

        this.$notify({
          title: 'Success',
          message: 'The user is created successsfully',
          type: 'success'
          });  
        
        this.isCreate = false;
        this.dialogSignUpFormVisible = false;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h1 {
    margin-top: 180px;
    font-family: "Vladimir Script";
    font-weight: normal;
    font-size: 120px;
    color: #eeeeee;
  }

  h2 {
    margin-top:0px;
    font-family: "Century Gothic";
    font-size:50px;
    font-weight: normal;
    color: #00B050;
  }

  p {
    font-size: 12px;
  }
  .el-row {
    margin-top: 0px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .el_user_pass {
    margin-top: 10px;
  }
  .el_col_bottom {
    margin-top: 20px;
    color: #bfbfbf;
  }

  video {
    position: fixed;
    right:0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    height: auto;
    overflow:hidden;
    width: auto;
    z-index: -99999;
    -webkit-filter:brightness(.6);
  }

</style>
