<template>
  <div class="virtual_machines">
    <el-row >
      <el-col :span="6" :offset="1" ><p>
       Virtual Machines
     </p>
   </el-col>

   <el-col :span="2" :offset="11">
    <el-button icon="plus" size="large" @click="preCreateNewVM" type="text"></el-button>
  </el-col>

</el-row>

<!-- <el-row type="flex"  justify="center">
  <el-col :span="3" v-for="(o, index) in 4" :offset="index > 0 ? 1 : 0" >
    <el-card :body-style="{ padding: '10px' }">
      <img src="../assets/logo.png" class="image" height="100px">
      <div style="padding-top: 14px;">
        <span>VM No.1</span>
        <div class="bottom clearfix">
        <p >status</p>
        <el-button type="text" icon="caret-right" class="button"></el-button>
        <el-button type="text" icon="information" class="button"></el-button>   
     </div>
   </div>
 </el-card>
</el-col>
</el-row>
 -->
<div class="uservmlist"  v-for="vmitem in vmItems" :key="vmitem.id">
  <vmitem :vm-info="vmitem" >
</vmitem>

</div>


<el-dialog  title="" top="15%" v-model="dialogCreateVMFormVisible" size="small">
  <el-row>
    <el-col :span="8">
      <h2>
        New VM
      </h2>
    </el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="10" :offset="2" >
      <el-form :model="create_vm_form"  :rules="create_vm_rules" ref="create_vm_form"  label-width="85px" class="demo-ruleForm">
        <el-form-item label="Name" prop="newVmName" >
          <el-tooltip placement="top">
            <div slot="content">a~z, A~z, 0~9, '_'</div>
            <el-input v-model="create_vm_form.newVmName" placeholder="The Machine's name" auto-complete="off"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="CPU" prop="newCPU">
          <el-tooltip placement="top">
            <div slot="content">1~4</div>
            <el-input  type="int" placeholder="2" v-model="create_vm_form.newCPU" auto-complete="off">
            </el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="Memory" prop="newMemory" >
          <el-tooltip placement="top">
            <div slot="content">512~8192</div>
            <el-input  type="int" v-model="create_vm_form.newMemory" placeholder="2048" auto-complete="off">
              <template slot="append">MB</template>
            </el-input>
          </el-tooltip>
          
        </el-form-item>
        <el-form-item label="Image" prop="newVMImage" >
          <el-cascader 
          :options="options"
          :show-all-levels="false"
          placeholder="Pleace choose an image"
          filterable
          change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <div slot="footer" class="dialog-footer">
   <el-button @click="dialogCreateVMFormVisible = false">Cancel</el-button>
   <el-button type="primary" @click="createVM" v-loading.fullscreen.lock="fullscreenLoading" >Create</el-button>
 </div>
</el-dialog>

</div>
</template>

<script>
  import VMItem from "./VMItem" 
  export default {
    name: 'virtual_machines',
    data () {
      return {
        create_vm_form: {
          newVmName: '',
          newCPU: '',
          newMemory: ''
        },
        create_vm_rules: {
          newVmName: [
          { required: true, trigger: 'blur'},
          { min: 6, message: 'at least 6 characters', trigger: 'blur' }
          ],
          newMemory: [
          { required: true, trigger: 'blur'},
          { min: 512, max: 8192, message: 'at least 6 characters', trigger: 'blur' }
          ],
          newCPU: [
          { required: true, trigger: 'blur'},
          { min: 1, max: 4, message: 'at least 6 characters', trigger: 'blur' }
          ]
        },
        options :[{
          value: 'linux',
          label: 'Linux',
          children: [{
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [{
              value: 'ubuntu14.04_desktop',
              label: 'Ubuntu 14.04 Desktop'
            },
            {
              value: 'ubuntu14.04_server',
              label: 'Ubuntu 14.04 Server'
            },
            {
              value: 'ubuntu16.04_desktop',
              label: 'Ubuntu 16.04 Desktop'
            },
            {
              value: 'ubuntu16.04_server',
              label: 'Ubuntu 16.04 Server'
            }
            ]},
            {
              value: 'centos',
              label: 'Centos',
              children: [{
                value: 'centos6.5',
                label: 'Centos6.5 x86_64'
              },
              {
                value: 'centos7.0',
                label: 'Centos7.0 x86_64'
              },
              {
                value: 'centos7.1',
                label: 'Centos7.1 x86_64'
              },
              {
                value: 'centos7.3',
                label: 'Centos7.3 x86_64'
              }
              ]},
              ]
            },
            {
              value: 'windows',
              label: 'Windows',
              children: [{
                value: 'winsows_xp',
                label: 'Windows Xp'
              },
              {
                value: 'winsows7',
                label: 'Windows 7'
              },
              {
                value: 'winsows10',
                label: 'Windows 10'
              }]
            },
            ],
            msg: 'Welcome to virtual_machines',
            dialogCreateVMFormVisible: false,
            fullscreenLoading: false,
            currentDate: new Date(),
            vmItems: [[{'id':4,'vmName': 'CentOs 7','vmStatus': "Active", "vmOSType":"centos" }, {'id':21,'vmName': 'Windows 10','vmStatus': "Active", "vmOSType":"windows" },{'id':435,'vmName': 'ubuntu','vmStatus': "Active", "vmOSType":"ubuntu" },{'id':12,'vmName': 'CentOs 6','vmStatus': "Suspend", "vmOSType":"centos" }]]
          }
        },
        methods: {
          preCreateNewVM() {
            this.isCreate = false;
            this.dialogCreateVMFormVisible = true;
            console.log(this.$refs['create_vm_form']);
            this.$refs['create_vm_form'].resetFields();
          },
          sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          },
          async createVM() {

            this.dialogCreateVMFormVisible = false;
            this.fullscreenLoading = true;
            // setTimeout(() => {
            //   this.fullscreenLoading = false;
            // }, 3000);
            await this.sleep(1000);
            this.fullscreenLoading = false;
            this.$notify({
              title: 'Success',
              message: 'The virtual machine is created successsfully',
              type: 'success'
            });
            console.log(this.create_vm_form.newMemory);
          }
        },
        components: {
          'vmitem': VMItem
        }
      }
    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>

      h2 {
        margin-top:0px;
        font-family: "Century Gothic";
        font-size:45px;
        font-weight: normal;
        color: #00B050;
      }
      p {
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 30px;
        color: #7F7F7F;
      }
      .el-button {
        margin-bottom: 10px;
        margin-top:40px;
      }

      .uservmlist {
        margin-top: 30px;
        margin-left: 50px;
      }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    margin-left: 20px;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
    </style>
