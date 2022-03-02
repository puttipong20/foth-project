<template>
  <div class="q-pa-md frm" style="width: 80%">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md F">
      <q-btn color="primary" label="1 . Chose Date" @click="active()" />
      <q-date
        v-if="status"
        v-model="toDate"
        default-year-month="2022/01"
        :rules="[(val) => (val !== null && val !== '') || 'Plese type Date']"
      />
      <q-input
        filled
        v-model="name"
        label="2 . Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <!-- ratio ATK -->
      <div class="q-gutter-sm rto">
        <div class="atk">3 . ATK :</div>
        <q-radio v-model="atk" val="Positive" label="Positive" color="teal" />
        <q-radio v-model="atk" val="Negative" label="Negative" color="orange" />
      </div>
      <q-input
        filled
        v-model="phone"
        type="Number"
        label="4 . Phone number*"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 9) || 'Please type real phone number',
        ]"
      />
      <q-input filled v-model="email" type="email" label="5 . E-mail*" />
      <!-- button -->
      <div>
        <q-btn
          @click="addData()"
          label="ADD data"
          type="submit"
          color="primary"
        />
        <q-btn @click="readData()" label="Read data" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
    <br />
    <!-- ตาราง -->
    <div class="q-pa-md ta">
      <q-option-group
        v-model="separator"
        inline
        class="q-mb-md"
        :options="separatorOptions"
      />
      <h5>Covid-List</h5>
      <q-markup-table :separator="separator" flat bordered>
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-right">Name</th>
            <th class="text-right">ATK</th>
            <th class="text-right">Phone Number</th>
            <th class="text-right">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in csData" :key="index">
            <td class="text-left">{{ item.toDate }}</td>
            <td class="text-right">{{ item.name }}</td>
            <td class="text-right">{{ item.atk }}</td>
            <td class="text-right">{{ item.phone }}</td>
            <td class="text-right">{{ item.email }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<style></style>

<script>
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../plugin/config-db";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../plugin/config-db";

export default {
  beforeMount() {
    this.checkLogin();
  },
  data: () => ({
    csData: [],
    status: false,
    user: "",
    email1: "",
    uid: "",
  }),
  methods: {
    checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          this.uid = user.uid;
          this.email1 = user.email;
          this.$emit("User", this.email1);
          // ...
        } else {
          // User is signed out
          // ...
          alert("Log in please");
          this.$router.push("/login");
        }
      });
    },
    active() {
      this.status = true;
    },
    async addData() {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          toDate: this.toDate,
          name: this.name,
          atk: this.atk,
          phone: this.phone,
          email: this.email,
        });
        alert("Add data successful");
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      this.toDate = "";
      this.name = "";
      this.atk = "";
      this.phone = "";
      this.email = "";
    },
    async readData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        this.csData.push(doc.data());
      });
      // const rows = this.csData;
      console.log(doc.csData);
    },
  },
  setup() {
    const $q = useQuasar();

    const toDate = ref(null);
    const name = ref(null);
    const atk = ref(null);
    const phone = ref(null);
    const email = ref(null);
    const accept = ref(false);

    return {
      color: ref("cyan"),
      toDate,
      name,
      atk,
      phone,
      email,
      accept,
      separator: ref("vertical"),
      separatorOptions: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
        { label: "Cell", value: "cell" },
        { label: "None", value: "none" },
      ],

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        toDate.value = null;
        name.value = null;
        atk.value = null;
        phone.value = null;
        email.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<style>
tr {
  text-align: center;
}
.rto {
  display: flex;
}
.atk {
  padding-top: 8px;
}
.frm {
  border: 2px solid black;
  box-shadow: 0 0 5 3 black;
  margin: 20px;
  border-radius: 10px;
}
.ta {
  border: 1px solid skyblue;
  border-radius: 10px;
  box-shadow: 0 0 50px 5px skyblue;
}
</style>
