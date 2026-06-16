import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  listaModelos: any[] = [];
  modeloSelecionado: string = '';
  codigoBuscaTabela: string = '2FRHDUYS2Y63NHD22454'; 

  totalVendas: number = 0;
  veiculosConectados: number = 0;
  softwareAtualizado: number = 0;
  imagemVeiculo: string = '';

  dadosTabelaFiltrados: any[] = [];
  dadosTabelaOriginais: any[] = [];

  constructor(private router: Router) {}
  

  ngOnInit(): void {
    this.carregarModelos();
    this.carregarDadosTabela();
  }

  carregarModelos(): void {
    // 4 modelos configurados com valores do protótipo
    this.listaModelos = [
      { id: 1, vehicle: 'Mustang', totalSales: 1500, connected: 500, updateSoftware: 750, image: '/img/mustang.png' },
      { id: 2, vehicle: 'Ranger', totalSales: 2300, connected: 1200, updateSoftware: 1100, image: '/img/ranger.png' },
      { id: 3, vehicle: 'Territory', totalSales: 4560, connected: 590, updateSoftware: 3050, image: '/img/territory.png' },
      { id: 4, vehicle: 'Bronco Sport', totalSales: 1800, connected: 600, updateSoftware: 950, image: '/img/broncoSport.png' }
    ];
    this.modeloSelecionado = 'Mustang';
    this.atualizarInformacoesModelo();
  }

  atualizarInformacoesModelo(): void {
    const veiculo = this.listaModelos.find(v => v.vehicle === this.modeloSelecionado);
    if (veiculo) {
      this.totalVendas = veiculo.totalSales;
      this.veiculosConectados = veiculo.connected;
      this.softwareAtualizado = veiculo.updateSoftware;
      this.imagemVeiculo = veiculo.image;
    }
  }

  carregarDadosTabela(): void {
    // Trocado de 'ok' para 'on' / 'off' conforme a especificação da Sprint
    this.dadosTabelaOriginais = [
      { vin: '2FRHDUYS2Y63NHD22454', odometer: '550.000', fuel: '12 %', status: 'on', lat: '-23.5505', lng: '-46.6333' },
      { vin: '9BFXUUUU12345678900', odometer: '12.400', fuel: '85 %', status: 'off', lat: '-22.9068', lng: '-43.1729' }
    ];
    this.filtrarTabelaPorCodigo();
  }

 filtrarTabelaPorCodigo(): void {
  const codigoLimpo = this.codigoBuscaTabela ? this.codigoBuscaTabela.trim().toLowerCase() : '';

  // 1. Se o campo de busca estiver vazio, a tabela DEVE ficar vazia
  if (!codigoLimpo) {
    this.dadosTabelaFiltrados = []; 
    return;
  }

  // 2. Se houver texto, faz o filtro exato ou por aproximação
  this.dadosTabelaFiltrados = this.dadosTabelaOriginais.filter(d => 
    d.vin.toLowerCase().includes(codigoLimpo)
  );
}

  executarBuscaPorBotao(): void {
    this.filtrarTabelaPorCodigo();
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('usuarioLogado');
    }
    this.router.navigate(['/login']);
  }
}