#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <set>
#include <unordered_map>
#include <algorithm>

using namespace std;

int merge_sort(const vector<vector<int>> &a, int &t) {
	vector<vector<int>> b;
	int in = 0;
	for (size_t k = 0; k < a.size() - 1; k += 2)
	{
		int i = 0, j = 0;
		vector<int> v;
		while (i != a[k].size() && j != a[k + 1].size())
		{
			if (a[k][i] <= a[k + 1][j]) {
				v.push_back(a[k][i]);
				i++;
			}
			else {
				if (a[k][i] > a[k + 1][j] + t)
					in++;
				v.push_back(a[k + 1][j]);
				j++;
			}
		}
		if (i == a[k].size())
			for (; j < a[k + 1].size(); j++)
				v.push_back(a[k + 1][j]);
		else if (j == a[k + 1].size())
			for (; i < a[k].size(); i++)
				v.push_back(a[k][i]);
		b.push_back(v);
	}
	if (a.size() % 2 == 1) {
		b.push_back(a[a.size() - 1]);
	}
	if (b.size() > 1)
		return in + merge_sort(b, t);
	return in;
}

int main() {
	int n, t;
	cin >> n >> t;
	vector<vector<int>> a;
	for (size_t i = 0; i < n; i++)
	{
		int b;
		cin >> b;
		a.push_back({ b });
	}
	cout << merge_sort(a, t);
	return 0;
}