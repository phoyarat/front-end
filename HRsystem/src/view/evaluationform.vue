<template>
<div style="font-family: 'Prompt'; display: flex; flex-direction: column; align-items: center; margin-top: 40px;">
    
    <!-- ปุ่มเริ่มการประเมิน -->
    <button v-if="!isEvaluating" @click="startEvaluation" style="margin-bottom: 20px; padding: 8px 16px;">
      เริ่มการประเมิน
    </button>

    <!-- ตารางประเมิน -->
    <div v-if="isEvaluating">
      <table border="1" cellpadding="8" style="border-collapse: collapse; text-align: center;">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ชื่อพนักงาน</th>
            <th>ตำแหน่ง</th>
            <th>คะแนนประเมิน</th>
          </tr>
        </thead>
        <tbody>
          <!-- วนลูปแสดงรายชื่อพนักงาน -->
          <tr v-for="(employee, index) in employees" :key="employee.id"
              :style="{ backgroundColor: getRowColor(employee.score) }">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.position }}</td>
            <td>
              <input type="number" v-model.number="employee.score" min="0" max="100" />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- ปุ่มบันทึก -->
      <button @click="saveAllScores" style="margin-top: 20px; padding: 8px 16px;">
        บันทึกคะแนนทั้งหมด
      </button>

      <!-- แสดงคะแนนเฉลี่ย -->
      <div style="margin-top: 16px;">
        <strong>คะแนนเฉลี่ยทั้งหมด:</strong> {{ averageScore.toFixed(2) }}
      </div>
    </div>
  </div>



  <!-- <div
    class="w-full h-min"
    style="font-family: 'Courier New', Courier, monospace"
  >
    <v-card>
      <h2>ข้อมูลผู้ถูกประเมิน</h2>
      <p>ชื่อ-สกุล{{ name }}</p>
      <p>ตำแหน่ง{{ Position }}</p>
      <p>แผนก{{ department }}</p>
      <p>รอบการประเมิน{{ period }}</p>
      <p>เบอร์โทร{{ telephone }}</p>
    </v-card>
  </div><hr>
<div
    class="w-full h-min"
    style="font-family: 'Courier New', Courier, monospace"
  >
    <v-card>
      <h2>ผลการประเมิน</h2>
      <p>ความรับผิดชอบ{{ responsibility }}</p>
      <p>การทำงานเป็นทีม{{ teamwork }}</p>
      <p>การตรงต่อเวลา{{ punctuality }}</p><hr>
      <p><strong>คะแนนเฉลี่ย: {{ ((responsibility + teamwork + punctuality) / 3).toFixed(2) }}</strong></p>
    </v-card>
  </div> -->

</template>
<script>
export default {
  data() {
    return {
      isEvaluating: false, // ใช้ควบคุมว่าจะโชว์ตารางไหม
      employees: [         // ข้อมูลพนักงานเริ่มต้น
        { id: 1, name: 'สมชาย', position: 'วิศวกร', score: 0 },
        { id: 2, name: 'สมหญิง', position: 'ผู้จัดการ', score: 0 },
        { id: 3, name: 'สมปอง', position: 'นักวิเคราะห์', score: 0 },
        { id: 4, name: 'สมศรี', position: 'เจ้าหน้าที่', score: 0 },
      ]
    };
  },
  
  computed: {
    averageScore() {
      if (this.employees.length === 0) return 0;
      const total = this.employees.reduce((sum, emp) => sum + emp.score, 0);
      return total / this.employees.length;
    }
  },

  methods: {
    startEvaluation() {
      this.isEvaluating = true;
    },

    getRowColor(score) {
      if (score < 70) return '#f8d7da';   // แดง = คะแนนต่ำ
      if (score >= 70 && score < 80) return '#fff3cd'; // เหลือง = ปานกลาง
      return '#d4edda';                   // เขียว = ดี
    },

    saveAllScores() {
      let message = 'บันทึกคะแนนพนักงานทั้งหมด:\n';
      this.employees.forEach(emp => {
        message += `${emp.name}: ${emp.score}\n`;
      });
      alert(message);
    }
  }
};



// import { standardEasing } from 'vuetify/lib/util/easing.mjs';

// export default {
//   data() {
//     return {
//       name: "นายโพธิ์ยราช คำนันทร์",
//       Position: " นักเรียนแผนกเทคโนโลยีสารสนเทศ",
//       department: " เทคโนโลยีสารสนเทศ",
//       period: " รอบประเมินที่ 1/2568",
//       telephone: " 080-160-8918",
//       responsibility: 4.5,
//       teamwork: 4.0,
//       punctuality: 5.0,
//     };
//   },
// };
</script>

