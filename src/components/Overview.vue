<template>
  <div class="overview">
    <el-row >
      <el-col :span="6"><p>
       Overview
     </p>
   </el-col>
 </el-row>

  <div class="usage">
  <el-row type="flex" justify="center">
    <el-col  :span="4" v-for="(usage, index) in userUsage" :key="usage.id" :offset="index > 0 ? 2: 0" >
     <usage :user-usage="usage" > 
      </usage>
    </el-col>
  </el-row>
    </div>


<!-- 
 <el-row class="usage" >

</el-row> -->
</div>
</template>

<script>
  import UserUsage from "./OverviewBar" 
  export default {
    name: 'overview',
    data () {
      return {
        msg: 'Welcome to overview',
        userUsage: [{"type":"Hosts","used":4,"total":5},{"type":"CPU","used":6,"total":10},{"type":"Memory","used":2048,"total":8192}]
      }
    },
    components: {
      'usage': UserUsage
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 30px;
    color: #7F7F7F;
  }
  .usage {
    margin-top: 30px;
    margin-bottom: 100px;
  }

</style>
