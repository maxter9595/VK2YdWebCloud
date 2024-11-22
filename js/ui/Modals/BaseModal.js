/**
 * Класс BaseModal
 * Используется как базовый класс всплывающего окна
 */
class BaseModal {
  constructor( element ) {
    this.semanticElement = element;
    this.domElement = element[0];
  }

  /**
   * Открывает всплывающее окно
   */
  open() {
    this.semanticElement.modal('show');
  }

  /**
   * Закрывает всплывающее окно
   */
  close() {
    this.semanticElement.modal('hide');
  }
}