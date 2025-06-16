package com.conectaai.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List; // Certifique-se de que esta importação está presente

@Configuration
@EnableWebSecurity
public class securityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Usa a configuração CORS definida abaixo
                .csrf(csrf -> csrf.disable()) // Desabilita CSRF (comum para APIs REST sem sessões)
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Permite todas as requisições sem autenticação (para teste de CORS)

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Definimos a origem específica do seu frontend
        configuration.setAllowedOrigins(List.of("http://192.168.100.70:8081"));
        // Permitimos todos os métodos HTTP necessários para uma API REST
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Permitimos todos os cabeçalhos que o navegador pode enviar
        configuration.setAllowedHeaders(List.of("*"));
        // Importante: Permitir credenciais se o frontend envia cookies ou tokens em cabeçalhos como Authorization
        configuration.setAllowCredentials(true);
        // Define o tempo que a resposta preflight pode ser armazenada em cache pelo navegador (3600 segundos = 1 hora)
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplica esta configuração CORS a todas as rotas da sua aplicação
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
