<template>
    <LandingHeader />
    <LandingHero />
    <LandingStats />
    <LandingHowItWorks />
    
    <LandingCTASection 
        title="Comece sua jornada no inglês hoje" 
        subtitle="Junte-se à comunidade de alunos"
        :showUsersIcon="true"
    />

    <LandingTestimonials />

    <LandingCTASection 
        variant="secondary"
        title="Pronto para começar?" 
        description="Acesse agora e comece a evoluir seu inglês com textos e áudios de qualidade."
    />

    <LandingFooter />
</template>

<script setup>
import LandingHeader from '../components/landing/LandingHeader.vue'
import LandingHero from '../components/landing/LandingHero.vue'
import LandingStats from '../components/landing/LandingStats.vue'
import LandingHowItWorks from '../components/landing/LandingHowItWorks.vue'
import LandingCTASection from '../components/landing/LandingCTASection.vue'
import LandingTestimonials from '../components/landing/LandingTestimonials.vue'
import LandingFooter from '../components/landing/LandingFooter.vue'
</script>