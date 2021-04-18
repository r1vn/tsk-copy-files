conditionally copy files

## setup

- download [tsk-copy-files.tar.xz](https://github.com/r1vn/tsk-copy-files/raw/master/tsk-copy-files.tar.xz) and unpack as `your-project/lib/tsk-copy-files`
- add a config entry to the manifest

example config: copying all `.jpg` but not `thumb.jpg` files from `source` to `output/images` in project directory

```
source/bar/file1.jpg
source/baz/file2.jpg
source/file3.jpg
source/thumb.jpg
```

```
{
    module: 'lib/tsk-copy-files',
    config:
    {
        // path of the directory to copy files from
        sourceDir: 'source',
        // filter for the files in sourceDir
        filterFn: srcPath => /\.jpg$/i.test(srcPath) && !/thumb\.jpg$/i.test(srcPath),
        // generates copy paths based on source paths
        dstFn: srcPath => srcPath.replace('source', 'output/images'),
        // toggles overwriting existing files
        overwrite: true,
        // toggles verbose output
        verbose: true
    }
}
```

result:

```
output/images/bar/file1.jpg
output/images/baz/file2.jpg
output/images/file3.jpg
```