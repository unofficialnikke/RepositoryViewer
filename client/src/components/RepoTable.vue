<template>
    <template v-if="!accessToken">
        <h2>Not logged in</h2>
        <c-button @click="userLogin" id="login">Sign in</c-button>
    </template>
    <template v-else>
        <h2>Currently logged in</h2>
        <c-button @click="userLogout">Sign out</c-button>
        <c-table responsive class="custom-table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Topics</th>
                        <th>Licenses</th>
                        <th>Repository URL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="repo in userRepos" :key="repo.name">
                        <td>{{ repo.name }}</td>
                        <td>{{ repo.description }}</td>
                        <td>{{ repo.topics.length > 0 ? repo.topics.join(', ') : 'No topics' }}</td>
                        <td>{{ repo.license === null ? 'No licenses' : repo.license }}</td>
                        <td>{{ repo.html_url }}</td>
                    </tr>
                </tbody>
            </table>
        </c-table>

    </template>

    <FetchData ref="dataFetch" />
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import FetchData from './FetchData.vue';
import type { IFetchData, IStarredRepos } from '../interface';

const accessToken = ref();
const userName = ref();
const userRepos: Ref<IStarredRepos[]> = ref([]);

const dataFetch = ref<IFetchData>();

const userLogin = () => {
    if (dataFetch.value) {
        dataFetch.value.login()
    }
}

const userLogout = () => {
    localStorage.removeItem('accessToken');
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
        userName.value = data.login;
        if (userName.value) {
            getRepos();
        }
    } catch (err) {
        console.error(err);
    }
}

async function getRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${userName.value}/starred`)
        const data = await response.json();
        userRepos.value = data;
        console.log('repos got')
    } catch (err) {
        console.error(err)
    }
}

onMounted(async () => {
    if (dataFetch.value) {
        dataFetch.value.getToken()
        accessToken.value = localStorage.getItem('accessToken');
        getUserData();
    }
})

</script>
