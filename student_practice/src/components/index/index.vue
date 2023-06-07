<template>
  <div>
    <h3>简易学生管理系统</h3>
    用户名：
    <input
      type="text"
      name=""
      v-model="newstu.name"
      placeholder="请输入用户名"
      class="row"
    />
    <br /><br />
    年龄：
    <input type="text" name="" v-model.number="newstu.age" class="row" />
    <br /><br />
    性别：
    <select name="" v-model="newstu.sex">
      <option value="男">男</option>
      <option value="女">女</option>
    </select>
    <br /><br />
    <button type="button" class="bg_red" @click="createStu">创建新用户</button>
    <hr />
    <h3>用户信息</h3>
    <button type="button" @click="avgAge">显示所有学生的平均年龄</button>
    <button type="button" @click="sortAge">按升序显示所有学生的年龄</button>
    <br /><br />
    按姓名搜索：
    <input type="text" v-model="studentsShow" />
    <table border="0" cellspacing="1" cellpadding="0" class="mytable">
      <tr>
        <th>id</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
        <th>操作</th>
      </tr>
      <tr v-for="stu in students">
        <td>{{ stu.id }}</td>
        <td>{{ stu.name }}</td>
        <td>{{ stu.age }}</td>
        <td>{{ stu.sex }}</td>
        <td>
          <button type="button" class="bg_green" @click="showPopwin(stu.id)">
            修改</button
          ><button type="button" class="bg_blue" @click="delStu(stu.id)">
            删除
          </button>
        </td>
      </tr>
    </table>
    <div id="pop" v-show="popshow">
      姓名：
      <input type="text" name="" v-model="editName" id="" value="" />
      <button type="button" @click="editStu">修改</button>
      <button type="button" @click="showPopwin = false">关闭</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        students: [
        { id: 1, name: "张三", age: 18, sex: "男" },
        { id: 2, name: "李四", age: 25, sex: "女" },
        { id: 3, name: "王五", age: 21, sex: "男" },
        { id: 4, name: "李璐", age: 22, sex: "女" },
        ],

        popshow: false,
        newstu: { id: 0, name: "", age: 0, sex: "男" },
        newid: 5,
        editId: 0,
        searcName: "",
        studentsShow: "",
    }
    
  },
  methods: {
    createStu: function () {
      if (this.newstu.name == "") {
        alert("请输入姓名");
        return;
      }
      if (this.newstu.age < 3) {
        alert("年龄太小");
        return;
      }
      this.newstu.id = this.id;
      this.students.unshift(this.newstu);
      this.newstu = { id: 0, name: "", age: 0, sex: "男" };
      this.id = this.id + 1;
    },
    showPopwin: function (id) {
      this.editId = id;
      this.popshow = true;
      this.editName = this.students[this.idToIndex(id)].name;
    },
    idToIndex: function (id) {
      for (var i = 0; i < this.students.length; i++) {
        if (this.students[i].id == id) return i;
      }
      return -1;
    },
    editStu: function () {
      this.students[this.idToIndex(this.editId)].name = this.editName;
      this.popshow = false;
      alert("修改成功");
    },
    delStu: function (id) {
      this.students.splice(this.idToIndex(id), 1);
    },
    avgAge: function () {
      sum = 0;
      for (var i = 0; i < this.students.length; i++) {
        sum = sum + this.students[i].age;
      }
      alert("平均年龄：" + Math.round(sum / this.students.length));
    },
    sortAge: function () {
      this.students.sort(function (a, b) {
        return a.age - b.age;
      });
    },
  },
  computed: {
    studentsShow: function () {
      return this.students.filter((item) => {
        return item.name.match(this.searcName);
      });
    },
  },
};
</script>

<style>
body {
  line-height: 150%;
}
#app {
  width: 600px;
  margin: 0 auto;
}
.row {
  width: 100%;
}
button {
  border: 0;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

.bg_red {
  background-color: #df0508;
  color: #fff;
}
.bg_green {
  background-color: #5ec603;
  color: #fff;
}
.bg_blue {
  background-color: #1548ca;
  color: #fff;
}
.mytable {
  width: 100%;
}
.mytable th {
  background-color: #6ecdff;
  line-height: 35px;
}
.mytable td {
  text-align: center;
}
#pop {
  position: absolute;
  left: 40%;
  top: 400px;
  background-color: #b4b4b4;
  padding: 15px;
}
</style>
