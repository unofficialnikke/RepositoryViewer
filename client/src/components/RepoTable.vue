<template>
    <!--
    <c-table responsive class="custom-table">
        <table>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.ssn }}</td>
                </tr>
            </tbody>
        </table>
    </c-table>
    -->
    <c-button @click="userLogin" id="login">Sign in</c-button>
    <FetchData ref="dataFetch" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FetchData from './FetchData.vue';
/*
type User = {
    id: string,
    name: string,
    ssn: string
}

defineProps({
    users: {
        type: Array as () => User[],
        required: true,
    },
    headers: {
        type: Array as () => string[],
        required: true
    }
})
*/
const dataFetch = ref<typeof FetchData | null>(null);

const userLogin = () => {
    if (dataFetch.value) {
        dataFetch.value.login()
    }

}
onMounted(async () => {
    if (dataFetch.value) {
        dataFetch.value.getToken()
    }
})

</script>
