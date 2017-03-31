<template>
  <div class="user">

    <el-row  type="flex">
      <el-col :span="3"  >
        <p>{{ logo_title }}</p>
      </el-col>
      <el-col :span="6" :offset="17">
        <el-tabs  v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Overview" name="first"></el-tab-pane>
          <el-tab-pane label="Virtual Machines" name="second"></el-tab-pane>
          <el-tab-pane label="" name="third"><span slot="label"><icon name="logout" scale="2" class="start"></icon></span></el-tab-pane>

        </el-tabs>

      </el-col>

    </el-row>
  </el-col>
  <transition name="component-fade" mode="out-in">
    <router-view></router-view>
  </transition>


<el-row :gutter="5">
 <el-col :span="6" :offset="9" class="el_col_bottom">
      <p class="copyright" >
      Copyright &copy; 2017 Junkai Huang. All rights reserved.
    </p>
      </el-col>
    </el-row>

</div>
</template>

<script>
  export default {
    name: 'user',
    data () {
      return {
        logo_title: 'SpringX',
        visible2: false,
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.name, event);
        if (tab.name === "third") {
          this.$confirm('Are you sure?', 'Warning', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: 'Log out'
            });
            this.$router.push('/');
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Cancel to exit'
            });          
          });
        }
        else if (tab.name === "second") {
          this.$store.dispatch('FETCH_USER_VM');
          this.$router.push('/user/'+this.$route.params['username']+"/virtual_machines");
        }
        else if (tab.name === "first") {
          this.$store.dispatch('FETCH_USER_USAGE');
          this.$router.push('/user/'+this.$route.params['username']+"/overview");
        }

      }
    }
  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  p {
    margin-top: 0px;
    font-family: "Vladimir Script";
    font-weight: normal;
    font-size: 40px;
    color: #00B050;

  }

  .copyright {
    font-family: "Century Gothic";
    margin-top: 30px;
    color: #bfbfbf;
    font-size: 12px;
  }
</style>
