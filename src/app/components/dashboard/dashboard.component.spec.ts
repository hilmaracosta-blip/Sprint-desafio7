import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('DashboardComponent - Passo 11 (Teste de Busca)', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent, 
        RouterModule.forRoot([]), 
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // VALIDAÇÃO EXIGIDA NO PASSO 11
  it('deve filtrar os dados da tabela utilizando o código do veículo exemplo: 2FRHDUYS2Y63NHD22454', () => {
    // 1. Configuramos os dados originais da simulação
    component.dadosTabelaOriginais = [
      { vin: '2FRHDUYS2Y63NHD22454', odometer: '550.000', fuel: '12 %', status: 'on', lat: '-23.5505', lng: '-46.6333' },
      { vin: '9BFXUUUU12345678900', odometer: '12.400', fuel: '85 %', status: 'off', lat: '-22.9068', lng: '-43.1729' }
    ];

    // 2. Injetamos o código VIN padrão exigido pelo roteiro
    component.codigoBuscaTabela = '2FRHDUYS2Y63NHD22454';

    // 3. Simulamos a ação de clique do botão buscar
    component.executarBuscaPorBotao();

    // 4. Valida se a tabela filtrou mantendo apenas 1 registro correspondente
    expect(component.dadosTabelaFiltrados.length).toBe(1);
    expect(component.dadosTabelaFiltrados[0].vin).toBe('2FRHDUYS2Y63NHD22454');
    expect(component.dadosTabelaFiltrados[0].status).toBe('on');
  });
});