// INTERFACES
export interface DestinationReceive {
  id: string;
  descricao: string;
  tipo?: string;
}

export interface Destination {
  id: string;
  nome: string;
  descricao: string;
  tipo?: string;
  orgaoNome?: string;
}
export interface DocumentSend {
  File: Buffer;
  Assinar: boolean;
  AssinantesIds: string[];
  ClasseId: string;
  Natureza: number;
  ValorLegal: number;

}

export interface Forward {
  titulo: string;
  remetente: string;
  papel: string;
  destino: [string];
  nomeDocumento: string;
  tipoDocumento: string;
  valorLegal: string;
}

export interface CapturePostBody {
  File: DocumentFile;
  Assinar: boolean;
  ClasseId?: string;
  Natureza: number;
  ValorLegal: number;
}

export interface CaptureReceive {
  id: string;
}

export interface ForwardPostBody {
  titulo: string;
  destinosIds: string[];
  conteudo: string;
  documentosIds: string[];
  encaminhamentoAnteriorId?: string;
  enviarEmailNotificacoes: boolean;
  responsavelId?: string;
}

export interface ForwardsReceive {
  urlHistorico: string;
  identificadorExterno: string;
  assunto: string;
  mensagem: string;
  dataHora: string;
  protocolo: string;
  origem: {
    tipo: string;
    id: string;
    nome: string;
    sigla: string;
  };
  destinos: [
    {
      tipo: string;
      id: string;
      nome: string;
      sigla: string;
    }
  ];
  urlDocumentoEdocs: string;
}

export interface DocumentFile {
  buffer?: ArrayBuffer;
  url?: string;
  name: string;
  type: string;
}

// ENUMS
export enum TipoDestino {
  Orgao = 0,
  Setor = 1,
  GrupoDeTrabalho = 2,
  Comissao = 3,
  Lotacao = 4,
  Ocupacao = 5,
  Servidor = 6,
  Cidadao = 7
}

export enum DocumentoNatureza {
  Natodigital = 1,
  Digitalizado = 2
}

export enum DocumentoValorLegal {
  Original = 1,
  CopiaAutenticadaCartorio = 2,
  CopiaAutenticadaAdministrativamente = 3,
  CopiaSimples = 4
}

export enum WizardSteps {
  BASIC = 'basicStep',
  ADDRESSEES = 'addresseesStep',
  DOC = 'docStep',
  MESSAGE = 'messageStep',
}