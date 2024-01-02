## building the blog

<br>

#### 1. source your virtual environment:

<br>

```bash
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

<br>

#### 2. create the blog most as a `md` file inside `./content`.

<br>

#### 3. `Makefile` has the commands to generate the final page:

<br>

```bash
make html
```

<br>

which can be copied to the website's repo with:

```bash
yes | cp -r output/* ../singularity-sh.vercel.app/
```

