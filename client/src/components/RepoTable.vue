<template>
    <!--
    <c-table responsive class="custom-table">
        <table>
            <tbody>
                <tr v-for="user in userData" :key="user.login">
                    <td>{{ user.login }}</td>
                    <td>{{ user.login }}</td>
                    <td>{{ user.location }}</td>
                </tr>
            </tbody>
        </table>
    </c-table>
-->
    <template v-if="!currentAccessToken">
        <h2>Not logged in</h2>
        <c-button @click="userLogin" id="login">Sign in</c-button>
    </template>
    <template v-else>
        <h2>Currently logged in</h2>
        <c-button @click="userLogout" id="login">Sign out</c-button>
        <c-button @click="getUserData" id="login">Get user data</c-button>
    </template>

    <FetchData ref="dataFetch" />
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import FetchData from './FetchData.vue';
import type { dataOfUser } from '../type';
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

const userData: Ref<dataOfUser[]> = ref([])

const currentAccessToken = ref();

const dataFetch = ref<typeof FetchData | null>(null);

const userLogin = () => {
    if (dataFetch.value) {
        dataFetch.value.login()
        currentAccessToken.value = localStorage.getItem('accessToken');
        console.log('Login ' + currentAccessToken.value)
    }
}

const userLogout = () => {
    localStorage.removeItem('accessToken');
    currentAccessToken.value = '';
    window.location.href = '/';
}

async function getUserData() {
    const requestConfig = {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + localStorage.getItem('accessToken')
        }
    }
    try {
        const response = await fetch('http://localhost:4000/getUserData', requestConfig)
        const data = await response.json();
        console.log(data);
        userData.value = data;
    } catch (err) {
        console.error(err);
    }
}

onMounted(async () => {
    if (dataFetch.value) {
        currentAccessToken.value = localStorage.getItem('accessToken');
        console.log('mountd ' + currentAccessToken.value);
        dataFetch.value.getToken()
    }
})

</script>
