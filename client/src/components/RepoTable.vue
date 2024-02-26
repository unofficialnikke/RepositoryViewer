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
    <c-button @click="login" id="login">Sign in</c-button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { VITE_CLIENT_ID } from '../constants';
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

async function login() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + VITE_CLIENT_ID)
}

onMounted(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);

    if (code) {
        try {
            const response = await fetch(`http://localhost:4000/getAccessToken?code=${code}`);
            const data = await response.json();
            const accessToken = data.access_token;
            localStorage.setItem('accessToken', accessToken);

            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    }
})

</script>
