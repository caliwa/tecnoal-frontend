export interface ProductoCertificadoTecnoal {
  id?: number;
  codigo?: string;
  producto?: string;
  sabor?: string;
  analisis_organolepticos?: string;
  color?: string;
  m_de_medicion_color?: string;
  apariencia?: string;
  m_de_medicion_apariencia?: string;
  textura?: string;
  m_de_medicion_textura?: string;
  sabor_analisis?: string;
  m_de_medicion_sabor?: string;
  olor?: string;
  m_de_medicion_olor?: string;
  analisis_fisico_quimico?: string;
  ph?: string;
  m_de_medicion_ph?: string;
  brix?: string;
  m_de_medicion_brix?: string;
  porcentaje_humedad?: string;
  m_de_medicion_porcentaje_humedad?: string;
  is_enabled: boolean;
}
