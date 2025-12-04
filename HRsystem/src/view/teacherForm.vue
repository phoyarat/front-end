<template>
  <div class="min-h-screen my-8 bg-gray-100" >
 <h1 class="text-2xl font-bold text-center pt-15  mt-5">
       แบบฟอร์มประเมิน
    </h1>

    <div
      v-if="assignment"
      class="bg-white  rounded-xl shadow max-w-xl mx-auto "
      style="margin-top: 2rem; padding: 30px;"
    >
      <p class=" text-gray-600 text-xl font-semibold"  >
        {{ assignment.teacher }}
      </p>

      <p class=" text-sm text-gray-600" >ภาควิชา: {{ assignment.department }}</p>

      <p
        class="text-blue-600 bg-blue-200 text-blue-900 text-xl rounded-md inline-block mt-1 px-2 py-1 mb-4"
      >
        {{ assignment.period }}
      </p>

      <hr class="my-4" />

      <form @submit.prevent="submitForm">
        <label class="block font-medium mt-4 text-left">1. ความรับผิดชอบ</label>
        <select
          v-model="form.responsibility"
          class="border w-full p-2 rounded-lg "
          required
        >
          <option value="">เลือกคะแนน</option>
          <option v-for="n in 5" :key="n">{{ n }}</option>
        </select>

        <label class="block font-medium mt-4 text-left">2. การสอน</label>
        <select
          v-model="form.teaching"
          class="border w-full p-2 rounded-lg"
          required
        >
          <option value="">เลือกคะแนน</option>
          <option v-for="n in 5" :key="n">{{ n }}</option>
        </select>

        <label class="block font-medium mt-4 text-left">3. เพิ่มเติม/หมายเหตุ</label>
        <textarea
          v-model="form.comment"
          class="border w-full p-2 rounded-lg"
          rows="3"
        ></textarea>

        <button
          class="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-2.5 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95"
        >
          ส่งแบบประเมิน
        </button>
      </form>
    </div>

    <div v-else class="text-center text-red-500 mt-10">
      ไม่พบข้อมูลการมอบหมาย
    </div>
  </div>
</template>

<script>
import assignments from "../resource/assignments.json";

export default {
  props: ["id"],

  data() {
    return {
      assignment: null,
      form: {
        responsibility: null,
        teaching: null,
        comment: "",
      },
    };
  },

  created() {
    this.assignment = assignments.find((a) => a.id === Number(this.id));
  },

  methods: {
    submitForm() {
      const evaluation = {
        id: Date.now(), // ไอดีความเห็น
        assignmentId: this.assignment.id,
        teacher: this.assignment.teacher,
        department: this.assignment.department,
        period: this.assignment.period,
        responsibility: Number(this.form.responsibility),
        teaching: Number(this.form.teaching),
        comment: this.form.comment,
        totalScore:
          Number(this.form.responsibility) + Number(this.form.teaching),
        date: new Date().toLocaleDateString("th-TH"),
      };

      // บันทึกผลลง localStorage
      let list = JSON.parse(localStorage.getItem("evaluations")) || [];
      list.push(evaluation);
      localStorage.setItem("evaluations", JSON.stringify(list));

      alert("ส่งแบบประเมินเรียบร้อย!");
      this.$router.push("/teachers");
    },
  },
};
</script>

<style scoped></style>
