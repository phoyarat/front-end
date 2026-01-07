<template>
  <div class="dashboard">
<div class="header">
  <h1 class="welcome">
    👋 Welcome back,
    <span class="username">{{ user?.username }}</span>
  </h1>
  <p class="subtitle">Manage users, roles, and permissions</p>
</div>

      <table class="user-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td v-if="editId !== user.id">{{ user.fname }} {{ user.lname }}</td>
            <td v-else>
              <input class="edit-input"  v-model="editForm.fname" placeholder="First Name" />
              <input class="edit-input"  v-model="editForm.lname" placeholder="Last Name" />
            </td>
            <td v-if="editId !== user.id">{{ user.username }}</td>
            <td v-else>
              <input class="edit-input"  v-model="editForm.username" placeholder="Username" />
            </td>
            <td>
              <button v-if="editId !== user.id" @click="startEdit(user)">Edit</button>
              <button v-else @click="saveEdit(user.id)">Save</button>
              <button v-if="editId === user.id" @click="cancelEdit" >Cancel</button>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const users = ref([]);
const editId = ref(null);
const editForm = ref({ fname: '', lname: '', username: '' });
const user = ref(JSON.parse(localStorage.getItem('user')))

const token = localStorage.getItem('token');
if (!token) {
  router.push('/login'); // ถ้าไม่มี token ให้กลับไปหน้า login
}

const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    users.value = await res.json();
  } catch (err) {
    alert('Please login again');
    localStorage.clear();
    router.push('/login');
  }
};

const startEdit = (user) => {
  editId.value = user.id;
  editForm.value = { ...user };
};

const cancelEdit = () => {
  editId.value = null;
  editForm.value = { fname: '', lname: '', username: '' };
};

const saveEdit = async (id) => {
  try {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editForm.value),
    });
    editId.value = null;
    fetchUsers();
  } catch (err) {
    alert('Failed to update user');
  }
};

const deleteUser = async (id) => {
  if (confirm('คุณต้องการลบ user นี้ใช่หรือไม่?')) {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch {
      alert('Failed to delete user');
    }
  }
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
};

onMounted(fetchUsers);
</script>

<style scoped>
.dashboard {
  padding: 20px;
  margin-top: 75px; 
}

.user-table {
  width: 100%;
  border-collapse: collapse; /* ⭐ สำคัญมาก */
  background: white;
}

.user-table th,
.user-table td {
  border: 1px solid #000000; /* เส้นเทาอ่อน */
  padding: 12px;
  text-align: left;
}

.user-table th {
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: white;
}

.user-table tr:hover {
  background-color: #f1f5f9;
}


button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #33cdf8;
  color: #ffffff;
}

button:hover {
  background-color: #133893;
}

.navbar {
  background-color: #333;
  color: white;
  padding: 10px 10px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
}

.logo img {
  height: 60px;
}

.header {
  margin-bottom: 2rem;
}

.welcome {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937; /* slate-800 */
}

.username {
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  margin-top: 6px;
  font-size: 16px;
  color: #6b7280; /* gray-500 */
}
.edit-input {
  margin-right: 10%;
  padding: 8px 10px ;
  border: 1px solid #d1d5db;   /* ⭐ เส้นขอบ */
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.edit-input:focus {
  border-color: #3b82f6;       /* ฟ้าเวลาโฟกัส */
  box-shadow: 0 0 0 2px rgba(59,130,246,0.15);
}

</style>