import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  showModal = false;
  showPrintModal = false;
  productoForm: FormGroup;
  selectedProducto: ProductoCertificadoTecnoal | null = null;
  currentDate: Date = new Date();

  constructor(private productoService: ProductoCertificadoTecnoalService, private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      producto: ['', Validators.required],
      sabor: ['', Validators.required],
      analisis_organolepticos: ['', Validators.required],
      color: ['', Validators.required],
      m_de_medicion_color: ['', Validators.required],
      apariencia: ['', Validators.required],
      m_de_medicion_apariencia: ['', Validators.required],
      textura: ['', Validators.required],
      m_de_medicion_textura: ['', Validators.required],
      sabor_analisis: ['', Validators.required],
      m_de_medicion_sabor: ['', Validators.required],
      olor: ['', Validators.required],
      m_de_medicion_olor: ['', Validators.required],
      analisis_fisico_quimico: ['', Validators.required],
      ph: ['', Validators.required],
      m_de_medicion_ph: ['', Validators.required],
      brix: ['', Validators.required],
      m_de_medicion_brix: ['', Validators.required],
      porcentaje_humedad: ['', Validators.required],
      m_de_medicion_porcentaje_humedad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProductos();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.productoForm.reset();
  }

  openPrintModal(producto: ProductoCertificadoTecnoal) {
    this.selectedProducto = producto;
    this.showPrintModal = true;
  }

  closePrintModal() {
    this.showPrintModal = false;
    this.selectedProducto = null;
  }

  printCertificate() {
    window.print();
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const emptyFields = this.getEmptyFields();
      if (emptyFields.length > 0) {
        Swal.fire({
          title: 'Campos Incompletos',
          html: `Por favor, complete los siguientes campos:<br>${emptyFields.join('<br>')}`,
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff',
        });
        return;
      }

      const newProducto: ProductoCertificadoTecnoal = {
        codigo: this.productoForm.get('codigo')?.value,
        producto: this.productoForm.get('producto')?.value,
        sabor: this.productoForm.get('sabor')?.value,
        analisis_organolepticos: this.productoForm.get('analisis_organolepticos')?.value,
        color: this.productoForm.get('color')?.value,
        m_de_medicion_color: this.productoForm.get('m_de_medicion_color')?.value,
        apariencia: this.productoForm.get('apariencia')?.value,
        m_de_medicion_apariencia: this.productoForm.get('m_de_medicion_apariencia')?.value,
        textura: this.productoForm.get('textura')?.value,
        m_de_medicion_textura: this.productoForm.get('m_de_medicion_textura')?.value,
        sabor_analisis: this.productoForm.get('sabor_analisis')?.value,
        m_de_medicion_sabor: this.productoForm.get('m_de_medicion_sabor')?.value,
        olor: this.productoForm.get('olor')?.value,
        m_de_medicion_olor: this.productoForm.get('m_de_medicion_olor')?.value,
        analisis_fisico_quimico: this.productoForm.get('analisis_fisico_quimico')?.value,
        ph: this.productoForm.get('ph')?.value,
        m_de_medicion_ph: this.productoForm.get('m_de_medicion_ph')?.value,
        brix: this.productoForm.get('brix')?.value,
        m_de_medicion_brix: this.productoForm.get('m_de_medicion_brix')?.value,
        porcentaje_humedad: this.productoForm.get('porcentaje_humedad')?.value,
        m_de_medicion_porcentaje_humedad: this.productoForm.get('m_de_medicion_porcentaje_humedad')?.value,
        is_enabled: true,
      };

      Swal.fire({
        title: 'Procesando',
        text: 'El producto se está enviando al servidor...',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      this.productoService.createMassive([newProducto]).subscribe(
        (result) => {
          console.log('Resultado:', result);
          Swal.fire({
            title: 'Éxito',
            text: 'El producto ha sido creado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007bff',
          }).then(() => {
            this.closeModal();
            this.loadProductos();
          });
        },
        (error) => {
          console.error('Error al crear el producto:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear el producto.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007bff',
          });
        },
      );
    } else {
      Swal.fire({
        title: 'Envío no válido',
        text: 'Por favor, ingrese todos los campos del formulario.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007bff',
      });
    }
  }

  getEmptyFields(): string[] {
    const emptyFields: string[] = [];
    Object.keys(this.productoForm.controls).forEach((key) => {
      const control = this.productoForm.get(key);
      if (control?.invalid) {
        emptyFields.push(this.getFieldName(key));
      }
    });
    return emptyFields;
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      codigo: 'Código',
      producto: 'Producto',
      sabor: 'Sabor',
      analisis_organolepticos: 'Análisis Organolépticos',
      color: 'Color',
      m_de_medicion_color: 'M. de Medición Color',
      apariencia: 'Apariencia',
      m_de_medicion_apariencia: 'M. de Medición Apariencia',
      textura: 'Textura',
      m_de_medicion_textura: 'M. de Medición Textura',
      sabor_analisis: 'Sabor Análisis',
      m_de_medicion_sabor: 'M. de Medición Sabor',
      olor: 'Olor',
      m_de_medicion_olor: 'M. de Medición Olor',
      analisis_fisico_quimico: 'Análisis Físico Químico',
      ph: 'PH',
      m_de_medicion_ph: 'M. de Medición PH',
      brix: 'Brix',
      m_de_medicion_brix: 'M. de Medición Brix',
      porcentaje_humedad: 'Porcentaje Humedad',
      m_de_medicion_porcentaje_humedad: 'M. de Medición % Humedad',
    };
    return fieldNames[key] || key;
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
          confirmButtonColor: '#007bff',
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
        confirmButtonColor: '#007bff',
      });
      return;
    }

    const action = producto.is_enabled ? 'desactivar' : 'activar';
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `¿Quieres ${action} este producto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
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
              confirmButtonColor: '#007bff',
            });
          },
          (error) => {
            console.error('Error updating producto', error);
            Swal.fire({
              title: 'Error!',
              text: 'Hubo un problema al actualizar el producto.',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#007bff',
            });
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
      if (!this.excelData || this.excelData.length === 0) {
        Swal.fire({
          title: 'Error',
          text: 'No se ha cargado ningún archivo Excel.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff',
        });
        return;
      }

      const headers = this.excelData[0] as string[];
      let data = this.excelData.slice(1) as any[][];

      console.log('Headers originales:', headers);

      data = data.filter((row) => row.some((cell) => cell !== null && cell !== ''));

      data = data.map((subArray) => {
        return subArray.slice(0, -4);
      });

      console.log(data);
      if (headers.length === 0 || data.length === 0) {
        Swal.fire({
          title: 'Error',
          text: 'El archivo Excel está vacío o no tiene el formato correcto',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff',
        });
        return;
      }

      if (headers.length !== 21) {
        Swal.fire({
          title: 'Error',
          text: 'El archivo Excel no tiene el número correcto de columnas.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#007bff',
        });
        return;
      }

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
          confirmButtonColor: '#007bff',
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
            confirmButtonColor: '#007bff',
          }).then(() => {
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
            confirmButtonColor: '#007bff',
          }).then(() => {
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
        confirmButtonColor: '#007bff',
      }).then(() => {
        window.location.reload();
      });
    }
  }
}
