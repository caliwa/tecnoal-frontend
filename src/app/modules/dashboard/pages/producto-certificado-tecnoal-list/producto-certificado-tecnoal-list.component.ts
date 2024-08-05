import { Component, OnInit } from '@angular/core';
import { ProductoCertificadoTecnoal } from '../../models/producto-certificado-tecnoal.model';
import { ProductoCertificadoTecnoalService } from '../../services/producto-certificado-tecnoal.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-producto-certificado-tecnoal-list',
  templateUrl: './producto-certificado-tecnoal-list.component.html',
  styleUrls: ['./producto-certificado-tecnoal-list.component.css'],
})
export class ProductoCertificadoTecnoalListComponent implements OnInit {
  productos: ProductoCertificadoTecnoal[] = [];
  excelData: any[][] = [];

  constructor(private productoService: ProductoCertificadoTecnoalService) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.getAll().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error fetching productos', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los productos',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff', // Color azul
        });
      },
    );
  }

  toggleActivation(producto: ProductoCertificadoTecnoal): void {
    if (producto.id === undefined) {
      console.error('Error: ID del producto no definido');
      Swal.fire({
        title: 'Error',
        text: 'No se puede actualizar el producto debido a un ID inválido',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007bff', // Color azul
      });
      return;
    }

    const action = producto.is_enabled ? 'desactivar' : 'activar';
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `¿Quieres ${action} este producto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Color azul
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        producto.is_enabled = !producto.is_enabled;
        this.productoService.update(producto.id!, producto).subscribe(
          () => {
            Swal.fire({
              title: 'Actualizado!',
              text: `El producto ha sido ${action}do.`,
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#007bff', // Color azul
            });
          },
          (error) => {
            console.error('Error updating producto', error);
            Swal.fire({
              title: 'Error!',
              text: 'Hubo un problema al actualizar el producto.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#007bff', // Color azul
            });
            // Revert the change in the local array
            producto.is_enabled = !producto.is_enabled;
          },
        );
      }
    });
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.excelData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(this.excelData);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  uploadExcelData() {
    try {
      // Verifica si hay datos en this.excelData
      if (!this.excelData || this.excelData.length === 0) {
        Swal.fire({
          title: 'Error',
          text: 'No se ha cargado ningún archivo Excel.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff', // Color azul
        });
        return;
      }

      const headers = this.excelData[0] as string[];
      let data = this.excelData.slice(1) as any[][];

      console.log('Headers originales:', headers);

      // Eliminar filas vacías
      data = data.filter((row) => row.some((cell) => cell !== null && cell !== ''));

      data = data.map((subArray) => {
        return subArray.slice(0, -4); // Mantén todos los elementos excepto los últimos 4
      });

      console.log(data);
      if (headers.length === 0 || data.length === 0) {
        Swal.fire({
          title: 'Error',
          text: 'El archivo Excel está vacío o no tiene el formato correcto',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff', // Color azul
        });
        return;
      }

      // Verifica que la cantidad de columnas coincida con el número de propiedades esperadas
      if (headers.length !== 21) {
        Swal.fire({
          title: 'Error',
          text: 'El archivo Excel no tiene el número correcto de columnas.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff', // Color azul
        });
        return;
      }

      // Mapear las filas a objetos ProductoCertificadoTecnoal
      const productos: ProductoCertificadoTecnoal[] = data.map((row) => {
        return {
          codigo: row[0],
          producto: row[1],
          sabor: row[2],
          analisis_organolepticos: row[3],
          color: row[4],
          m_de_medicion_color: row[5],
          apariencia: row[6],
          m_de_medicion_apariencia: row[7],
          textura: row[8],
          m_de_medicion_textura: row[9],
          sabor_analisis: row[10],
          m_de_medicion_sabor: row[11],
          olor: row[12],
          m_de_medicion_olor: row[13],
          analisis_fisico_quimico: row[14],
          ph: row[15],
          m_de_medicion_ph: row[16],
          brix: row[17],
          m_de_medicion_brix: row[18],
          porcentaje_humedad: row[19],
          m_de_medicion_porcentaje_humedad: row[20],
          is_enabled: true,
        } as ProductoCertificadoTecnoal;
      });

      console.log('Número de filas con datos:', data.length);
      console.log('Productos válidos:', productos.length);
      console.log('Primer producto:', productos[0]);

      if (productos.length === 0) {
        Swal.fire({
          title: 'Error',
          text: 'No se encontraron productos válidos en el archivo Excel',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff', // Color azul
        });
        return;
      }

      Swal.fire({
        title: 'Procesando',
        text: 'Los productos se están enviando al servidor...',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      this.productoService.createMassive(productos).subscribe(
        (result) => {
          console.log('Resultado:', result);
          let message = `Se han creado ${result.created} productos correctamente.`;
          if (result.skipped > 0) {
            message += `\n${result.skipped} productos fueron omitidos porque ya existían o tenían datos inválidos.`;
            if (result.skippedCodes && result.skippedCodes.length > 0) {
              message += `\nCódigos omitidos: ${result.skippedCodes.join(', ')}`;
            }
          }
          Swal.fire({
            title: 'Proceso Completado',
            text: message,
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007bff', // Color azul
          }).then(() => {
            // Recargar la página cuando se cierre el modal
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error al crear productos:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al procesar los productos.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007bff', // Color azul
          }).then(() => {
            // Recargar la página incluso si hay un error
            window.location.reload();
          });
        },
      );
    } catch (error) {
      console.error('Error inesperado:', error);
      Swal.fire({
        title: 'Error',
        text: `Hubo un problema inesperado: ${error || 'Error desconocido.'}`,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007bff', // Color azul
      }).then(() => {
        // Recargar la página incluso si hay un error
        window.location.reload();
      });
    }
  }

  private normalizeHeader(header: string): string {
    // Elimina espacios al inicio y al final, y convierte a minúsculas
    header = header.trim().toLowerCase();

    // Mapeo de encabezados
    const headerMap: { [key: string]: string } = {
      codigo: 'codigo',
      producto: 'producto',
      sabor: 'sabor',
      'análisis organolépticos': 'analisis_organolepticos',
      color: 'color',
      'M. de Medición Color': 'm_de_medicion_color',
      apariencia: 'apariencia',
      'M. de Medición Apariencia': 'm_de_medicion_apariencia',
      textura: 'textura',
      'M. de Medición Textura': 'm_de_medicion_textura',
      'Sabor Análisis': 'sabor_analisis',
      'M. de Medición Sabor': 'm_de_medicion_sabor',
      olor: 'olor',
      'M. de Medición Olor': 'm_de_medicion_olor',
      'análisis fisico quimico': 'analisis_fisico_quimico',
      ph: 'ph',
      'M. de Medición PH': 'm_de_medicion_ph',
      Brix: 'brix',
      'M. de Medición Brix': 'm_de_medicion_brix',
      '% humedad': 'porcentaje_humedad',
      'M. de Medición % Humedad': 'm_de_medicion_porcentaje_humedad',
      is_enabled: 'is_enabled',
    };

    return headerMap[header] || header;
  }
}
