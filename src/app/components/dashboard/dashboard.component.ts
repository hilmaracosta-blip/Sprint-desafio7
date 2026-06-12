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
  codigoBuscaTabela: string = '2FRHDUYS2Y63NHD22454'; // Padrão exigido no Passo 11

  totalVendas: number = 0;
  veiculosConectados: number = 0;
  softwareAtualizado: number = 0;
  imagemVeiculo: string = '';

  dadosTabelaFiltrados: any[] = [];
  dadosTabelaOriginais: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Carregando Dashboard diretamente no modo de apresentação SENAI...');
    
    // Chamadas diretas da API sem travas de rota
    this.carregarModelos();
    this.carregarDadosTabela();
  }

  // Passo 8: Busca as opções de veículos no Back-end
  carregarModelos(): void {
    fetch('http://localhost:3000/vehicle')
      .then(res => res.json())
      .then(data => {
        this.listaModelos = data;
        if (this.listaModelos.length > 0) {
          this.modeloSelecionado = this.listaModelos[0].vehicle;
          this.atualizarInformacoesModelo();
        }
      })
      .catch(err => {
        console.warn('Usando dados de simulação locais para os veículos...');
        this.listaModelos = [
          { id: 1, vehicle: 'Mustang', totalSales: 1800, connected: 500, updateSoftware: 750, image: '/img/mustang.png' },
          { id: 2, vehicle: 'Ranger', totalSales: 2300, connected: 1200, updateSoftware: 1100, image: '/img/ranger.png' },
          { id: 3, vehicle: 'Territory', totalSales: 4560, connected: 590, updateSoftware: 3050, image: '/img/territory.png' }
        ];
        this.modeloSelecionado = 'Mustang';
        this.atualizarInformacoesModelo();
      });
  }

  // Passo 9 e 10: Atualiza os contadores e a imagem com base no Select
  atualizarInformacoesModelo(): void {
    const veiculo = this.listaModelos.find(v => v.vehicle === this.modeloSelecionado);
    if (veiculo) {
      this.totalVendas = veiculo.totalSales;
      this.veiculosConectados = veiculo.connected;
      this.softwareAtualizado = veiculo.updateSoftware;
      this.imagemVeiculo = veiculo.image;
    }
  }

  // Passo 11: Busca as informações detalhadas da tabela no Back-end
  carregarDadosTabela(): void {
    fetch('http://localhost:3000/vehicleData')
      .then(res => res.json())
      .then(data => {
        this.dadosTabelaOriginais = data;
        this.filtrarTabelaPorCodigo();
      })
      .catch(err => {
        console.warn('Usando dados de simulação locais para a telemetria...');
        this.dadosTabelaOriginais = [
          { vin: '2FRHDUYS2Y63NHD22454', odometer: '550.000', fuel: '12 %', status: 'ok', lat: '-23.5505', lng: '-46.6333' },
          { vin: '9BFXUUUU12345678900', odometer: '12.400', fuel: '85 %', status: 'ok', lat: '-22.9068', lng: '-43.1729' }
        ];
        this.filtrarTabelaPorCodigo();
      });
  }

  // Filtro de tempo real para o input da tabela
  filtrarTabelaPorCodigo(): void {
    if (!this.codigoBuscaTabela.trim()) {
      this.dadosTabelaFiltrados = this.dadosTabelaOriginais;
    } else {
      this.dadosTabelaFiltrados = this.dadosTabelaOriginais.filter(d => 
        d.vin.toLowerCase().includes(this.codigoBuscaTabela.toLowerCase().trim())
      );
    }
  }

  // Função de Logout corrigida sem erros de sintaxe
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('usuarioLogado');
    }
    this.router.navigate(['/login']);
  }
}