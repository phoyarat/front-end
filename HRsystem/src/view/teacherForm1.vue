<template>
    <div class="bg-white px-11 rounded-xl shadow-xl shadow py-5 ">
        <h1 class="font-bold text-gray-700 mb-2 text-left">
            แบบประเมินผลบุคลากร
        </h1>
        <p class="text-gray-800 text-left my-5">
            ครูผู้สอน: {{ teacher?.name }} * ภาควิชา : {{ teacher.department }} 
        </p>
        <hr class="text-gray-800">

       <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-200 ">
          <th class="py-3 text-left">ตัวชี้วัด/เกณฑ์</th>
          <th class="p-3 text-center w-32 ">คะแนน/เต็ม</th>
          <th class="p-3 text-center w-24">ผ่าน/ไม่ผ่าน</th>
          <th class="p-3">หมายเหตุ</th>
        </tr>
      </thead>
      
      <tbody>
        <tr 
          v-for="item in criteria"
          :key="item.id"
          class="border-b hover:bg-gray-50"
        >
          <td class="py-3 text-left">{{ item.title }}</td>

          <td class="p-3 text-center">
            <input
              v-model.number="item.score"
              type="number"
              min="0"
              max="5"
              class="w-20 border rounded-lg p-1 text-center"
            />
          </td>

          <td class="p-3 text-center">
            <select v-model="item.pass" class="border rounded-lg p-1 px-2">
              <option :value="true">✓ ผ่าน</option>
              <option :value="false">✗ ไม่ผ่าน</option>
            </select>
          </td>

          <td class="p-3">
            <input
              v-model="item.note"
              type="text"
              class="w-full border rounded-lg p-1 "
              placeholder="เพิ่มหมายเหตุ..."
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-end gap-4 mt-8">
      <button
        @click="emitSave"
        class="px-6 py-3 bg-secondary rounded-xl hover:bg-secondary"
      >
        บันทึกชั่วคราว
      </button>
      
      <button
        @click="emitSubmit"
        class="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary"
      >
        ยืนยันผลประเมิน
      </button>
    </div>
  </div>
</template>

<script>
import assignments from '../resource/assignments.json'
export default {
  name: "TeacherForm",

  props: {
    teacher: {
      type: Object,
      required: true,
      default: () => ({ id: null, name: 'Unknown' })
    },

    criteria: {
      type: Array,
      required: true,
      default: () => []
    },
  },

  methods: {
    emitSave() {
      this.$emit("save-draft", this.criteria); 
      console.log("Saving Draft:", this.criteria);
    },
    emitSubmit() {
      this.$emit("submit", this.criteria);
      console.log("Submitting:", this.criteria);
    },
  },
};
</script>

<style scoped>
</style>