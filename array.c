#include <stdint.h>
void appendHtml(int);
int sumArray(int *arr, int length) {
  int sum = 0;
  for(int i=0;i<length;i++) {
    sum+= *(arr+i);
  }
  appendHtml(sum);
  return sum;
}