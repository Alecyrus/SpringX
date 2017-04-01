<template>
<div class="vm_list" >
  <el-row type="flex">
  
    <transition-group name="list-complete" tag="p">
    <el-col  class="list-complete-item"  v-for="(vm, index) in vmInfo" :key="vm" >
        <el-card  :body-style="{ margin: '0px' }" >
          <!-- <img src="../assets/logo.png" class="image" height="100px"> -->
          <icon :name="vm.vmOsType" scale="10" class='vmtitle' ></icon>

          <div style="padding-top:10px;">

            <span>{{vm.vmName}}</span>
            <div><el-button type="text" @click="enterVM(vm)">{{vm.vmStatus}}</el-button></div>

            <div class="bottom">

              <el-button type="text" @click="vmStart(vm)"><icon name="start" scale="2" class="start"></icon></el-button>
              <el-button type="text" @click="vmShutdown(vm)"><icon name="shutdown" scale="2" class="shutdown"></icon></el-button>
              <el-button type="text" @click="vmDelete(vm)"><icon name="delete" scale="2" class="delete"></icon></el-button>   
            </div>
          </div>
        </el-card>
      </el-col>

    </transition-group>

    
  </el-row>
</div>
</template>

<script>
  export default {
    name: 'vmitem',
    props: ['vmInfo'],
    data () {
      return {
        isLoading:[0,0,0,0]
      };
    },
    methods: {
      vmStart(vm) {
        console.log(vm);
        this.$request.post('/api/v1/environment/action', {
          user_id: vm.user_id,
          template_id: vm.template_id
        }).then((response) => {
          let resp = JSON.parse(response.data.replace(/'([^']*)'/g,'"$1"'));
          console.log(resp);
          this.$message({
            showClose: true,
            message: resp.info
          });
        }).catch((error) => {
          console.log(error);
          this.$message({
            showClose: true,
            type: 'error',
            message: "Network Error",
          });
        });
        this.$store.dispatch('FETCH_USER_VM');


      },
      vmShutdown(vm) {
        console.log(vm);
        this.$request.put('/api/v1/environment/action', {
          user_id: vm.user_id,
          template_id: vm.template_id
        }).then((response) => {
          let resp = JSON.parse(response.data.replace(/'([^']*)'/g,'"$1"'));
          console.log(resp);
          this.$message({
            showClose: true,
            message: resp.info
          });
        }).catch((error) => {
          console.log(error);
          this.$message({
            showClose: true,
            type: 'error',
            message: "Network Error",
          });

        });
        this.$store.dispatch('FETCH_USER_VM');

      },
      vmDelete(vm) {
        this.$request.delete('/api/v2/environment/target/'+vm.user_id+'&'+vm.template_id)
        .then((response) => {
          let resp = JSON.parse(response.data.replace(/'([^']*)'/g,'"$1"'));
          console.log(resp);
          this.$message({
            showClose: true,
            message: resp.info
          });
        }).catch((error) => {
          console.log(error);
          this.$message({
            showClose: true,
            type: 'error',
            message: "Network Error",
          });
        });
        this.$store.dispatch('FETCH_USER_VM');
      },
      enterVM(vm) {
        console.log(vm);
        if (vm.vmStatus === 'Power Off') {
          this.$message({
            showClose: true,
            type: 'error',
            message: "Not Running",
          });
        }
        else {
          this.$request.patch('/api/v1/environment/action', {
            user_id: vm.user_id,
            template_id: vm.template_id
          }).then((response) => {
            this.$message({
              showClose: true,
              type: 'success',
              message: "Enter the " + vm.vmName + " remote desktop successfully",
            });
            let resp = JSON.parse(response.data.replace(/'([^']*)'/g,'"$1"'));
            console.log(resp.info.uri);
            window.open(resp.info.uri, "vmName", "width=581,height=335,toolbar=no,menubar=yes,scrollbars=no,resizable=no,resizable=no,status=no");
          }).catch((error) => {
            console.log(error);
            this.$message({
              showClose: true,
              type: 'error',
              message: "Network Error",
            });
          });
        }
        
      }
    }
  }
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  p {
    color: green;
    font-size: 15px;

  }
  span {
    font-size: 20px;
    font-color: #7F7F7F;
  } 

  .el-row {
    margin-bottom: 30px;
  }
  .bottom {
    margin-top: 10px;
    margin-bottom: 0px
  }
  p:hover {
    color: #00ac5e;
  }
  .vmtitle {
    margin-top: 10px;
    /*color: #F98E00;*/
    color: #00b050;
  }

  .start {
    color: #00B050;
  }
  .start:hover{
    color: #00c700;

  }

  .shutdown {
    color: #f97100;
  }
  .shutdown:hover {
    color: #f9a600;
  }
  .delete {
    color: #f90000;
  }
  .delete:hover {
    color: #fc7171;
  }
  .el-card {
    border: 1px solid #eaeefb;
    transition:all .3s ease-in-out;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, .10), 0px 0px 1px 0px rgba(0, 0, 0, .04)
  }

  .el-card:hover {
    margin-top: -1px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, .10), 0px 0px 12px 0px rgba(0, 0, 0, .04)
  }
  .vmStatus {
    transition:all .3s ease-in-out;
  }


  .list-complete-item {
    transition: all 1s;
    width: 190px;
    margin-left: 100px;
  }
  .list-complete-enter, .list-complete-leave-active {
    opacity: 0;
    transform: translateY(30px);
    transition:all .3s ease-in-out;
  }
  .list-complete-leave-active {
    position: absolute;
  }


  .vm_list {
    margin-left:80px;
  }
</style>
