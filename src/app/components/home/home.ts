import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  usuarioLogado: string = 'admin';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Tratamento seguro para o Angular 20 no SENAI
    if (typeof window !== 'undefined' && window.localStorage) {
      const nome = localStorage.getItem('usuarioLogado');
      if (nome) {
        this.usuarioLogado = nome;
      } else {
        // Se a sessão sumir e você quiser que ele NÃO te jogue pro login,
        // pode deixar essa linha comentada com duas barras para facilitar a apresentação:
        localStorage.setItem('usuarioLogado', 'admin');
      }
    }
  }

  // Função de logout corrigida e limpa
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('usuarioLogado');
    }
    this.router.navigate(['/login']);
  }
}