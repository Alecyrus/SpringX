<template>
  <!-- <div class="echarts"> -->
<!--   <el-row type="flex" justify="center">

    <el-col  :span="4" v-for="(usage, index) in userUsage" :key="usage.id" :offset="index > 0 ? 1 : 0" > -->
      <el-card :body-style="{ padding: '5px'}">
        <div>
          <p class="title">{{userUsage.type}}</p>
          <div class="bottom">
            <IEcharts :option="pie" :id='userUsage.type'  @ready="onReady()" @click="onClick()"></IEcharts>
          </div>
          <h1 class="usage">Used <span class="used">{{userUsage.used}}</span> of <span class="total">{{userUsage.total}}</span> </h1>
        </div>
      </el-card>
<!--     </el-col>
  </el-row> -->
  <!--   </div> -->
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3';
  export default {
    name: 'usage',
    components: {
      IEcharts
    },
    props: ['userUsage'],
    data () {
      return {
        loading: false,
        piedata: {},
        pie: {
          title: {
            text: '',
            top: 'bottom',
            left: 'center',
            padding: 0,
            textStyle: {
              color: '#ccc',
            }
          },
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c}"
          },
          series: [ {
            name:'',
            type:'pie',
            radius : '70%',
            center: ['50%', '50%'],
            data:[
            {value:2, name:'Used'},
            {value:3, name:'Available'}
            ].sort(function (a, b) { return a.value - b.value}),
            roseType: 'radius',
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: '#97c7b6'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#97c7b6'
                },
                smooth: 0.1,
                length: 5,
                length2: 5
              }
            },
            itemStyle: {
              normal: {
                // color: '#00B050',
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 500;
            }
          }]
        }
      }
    },
    methods: {
      onReady(instance) {
        // console.log(document.getElementById('CPU'));
        // console.log(this.userUsage[arguments[0]].type);


        var used = this.userUsage.used;
        var unused = this.userUsage.total - used;

        this.pie.series[0].data=[
            {value:used, name:'Used'},
            {value:unused, name:'Available'}
            ];
        // console.log(this.pie.series[0].data[0]['value'])
      },
      onClick(event, instance) {
        console.log(arguments);
      }
    }
  };
</script> 

<style scoped>
  .echarts {
    width: 100px;
    height:200px;
/*    margin-bottom: 100px;
    margin-left: 100px;*/
  }


  .title {
    margin-bottom:10px;
  }
  .bottom {
    height: 200px;
    margin-top: 0px;
    margin-bottom: 0px
  }


  p {
    margin-top:5px;
    font-size: 30px;
    font-family: "Century Gothic";
    text-align:center;
    color: #757575;
  }
  .usage {
    margin-top:20px;
    font-family: "Century Gothic";
    text-align:center;
    color:#ccc;
    font-weight:normal;
    font-size: 18px;
  }

  .el-card {
    height:350px;
    width: 250px;
  }

  .used {
    color: #00B050;
    transition:all .3s ease-in-out;
  }
  .used:hover {
    color: #00c700;
    /*font-weight: bolder;*/
    font-size: 22px;
  }

  h1 {
    transition:all .3s ease-in-out;
  }

  h1:hover {
    font-size: 20px;
  }

  .total {
    color: #757575;

  }
  .el-card {
    border: 1px solid #eaeefb;
    transition:all .3s ease-in-out;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, .10), 0px 0px 1px 0px rgba(0, 0, 0, .04)
  }

  .el-card:hover {
    margin-top: -1px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, .10), 0px 0px 12px 0px rgba(0, 0, 0, .04)
  }

</style>