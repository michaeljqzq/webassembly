// 分配内存，此数组占0x1000*4=16384byte
static int s_array[0x1000];
static int s_current_index = 0;
int *get_start();
int *get_end();
void generate_array(int);
// 暴露给JS使用，得到数组的开始偏移量
int *get_start()
{
  return s_array;
}
// 暴露给JS使用，得到数组的结束偏移量
int *get_end()
{
  return &s_array[s_current_index];
}
// 将生成的数组放进内存中
void generate_array(int count)
{
  for (int i = 0; i < count; ++i)
  {
    s_array[i] = i;
  }
  s_current_index = count;
}