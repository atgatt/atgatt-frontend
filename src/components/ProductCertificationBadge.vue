<template>
    <li v-if="certification">
        <font-awesome-icon icon="check" class="fa-li cert" />
        <span class="badge badge-success">
            {{certificationName}}
            <span v-if="certification.stars">
              - {{certification.stars}} Stars
            </span>
        </span>
    </li>
    <li v-else>
        <font-awesome-icon icon="times" class="fa-li cert-missing" />
        <span class="badge badge-danger">
            {{certificationName}}
        </span>
    </li>
</template>

<script>
export default {
  name: 'ProductCertificationBadge',
  props: ['certificationName', 'certification']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cert {
  color: #28a745;
  margin-top: 5px;
}

.cert-missing {
  color: #dc3545;
}

.badge {
  width: 100%;
}
</style>
