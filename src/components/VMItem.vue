<template>
  <el-row type="flex">
  <el-col :span="3" v-for="(vm, index) in vmInfo" :key="vm.id" :offset="index > 0 ? 1 : 4" >
    <el-card :body-style="{ padding: '5px' }">
      <!-- <img src="../assets/logo.png" class="image" height="100px"> -->
      <icon :name="vm.vmOSType" scale="10" class='vmtitle'></icon>
      <div style="padding-top:10px;">
        
        <span>{{vm.vmName}}</span>
        <div class="bottom">
          <p >{{vm.vmStatus}}</p>
          <el-button type="text" @click="vmOperate(vm.id, 'start')"><icon name="start" scale="2" class="start"></icon></el-button>
          <el-button type="text" @click="vmOperate(vm.id, 'shutdown')"><icon name="shutdown" scale="2" class="shutdown"></icon></el-button>
          <el-button type="text" @click="vmOperate(vm.id, 'delete')"><icon name="delete" scale="2" class="delete"></icon></el-button>   
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

</template>

<script>
  export default {
    name: 'vmitem',
    props: ['vmInfo'],
    methods: {
      vmOperate() {
        //这里进行虚拟机的控制
        console.log(arguments);
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

</style>
