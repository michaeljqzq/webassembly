#include "stdio.h"
extern "C" {
  int counter = 100;

  int count()
  {
    counter += 1;
    return counter;
  }

  void showHello() {
    printf("Hello world");
  }
}