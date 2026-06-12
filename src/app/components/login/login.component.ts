import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuarioInput: string = '';
  senhaInput: string = '';
  mensagemErro: string = '';
  esconderSenha: boolean = true;

  constructor(private router: Router) {}

  alternarVisualizacaoSenha(): void {
    this.esconderSenha = !this.esconderSenha;
  }

  efetuarLogin(): void {
    this.mensagemErro = '';

    // 1. VALIDAÇÃO LOCAL DO PASSO 3 (Testa primeiro para garantir a apresentação no SENAI)
    if (this.usuarioInput === 'admin' && this.senhaInput === '123456') {
      console.log('Login efetuado localmente com sucesso! (Modo SENAI)');
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('usuarioLogado', 'admin');
      }
      this.router.navigate(['/home']);
      return; // Para a execução aqui e entra direto!
    }

    // 2. Se não forem as credenciais de teste, tenta bater na API oficial
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: this.usuarioInput, senha: this.senhaInput })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => { throw new Error(data.message); });
      }
      return res.json();
    })
    .then(data => {
      console.log('Login efetuado via API!', data);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('usuarioLogado', data.nome);
      }
      this.router.navigate(['/home']); 
    })
    .catch(err => {
      console.error('Erro na API e credenciais locais incorretas:', err);
      this.mensagemErro = 'Usuário ou senha incorretos.';
    });
  }
}