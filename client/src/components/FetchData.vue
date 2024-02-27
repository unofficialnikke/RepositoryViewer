<!-- eslint-disable vue/valid-template-root -->
<template></template>

<script setup lang="ts">
import { VITE_CLIENT_ID } from '../constants';

async function login() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + VITE_CLIENT_ID)
}

async function getToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        try {
            const response = await fetch(`http://localhost:4000/getAccessToken?code=${code}`);
            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem('accessToken', data.access_token);
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
        }
    }
}

defineExpose({
    login,
    getToken,
});

</script>